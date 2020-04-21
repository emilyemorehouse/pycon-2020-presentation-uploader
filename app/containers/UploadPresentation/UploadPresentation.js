/* @flow */
import React, { useState } from 'react'
import Airtable from 'airtable'
import Dropbox from 'dropbox'
import { MaskedInput, Meter, RadioButtonGroup, Select, TextArea } from 'grommet'
import { isEmail } from 'validator'

// Components
import { Anchor } from 'components/Anchor'
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Form, FormField } from 'components/Form'
import { Heading } from 'components/Heading'
import { Message } from 'components/Message'
import { Text } from 'components/Text'
import { TextInput } from 'components/TextInput'

// Utils and messages
import useFlashMessage from '../../hooks/FlashMessage'
import {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID,
  DATES,
  DROPBOX_TOKEN,
  MAX_BLOB,
  TITLES_BY_CATEGORY,
  UPLOAD_FILE_SIZE_LIMIT,
} from './UploadPresentation.constants'
import header from '../../assets/images/header.png'

const AIRTABLE_BASE = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)
const DROPBOX_CLIENT = new Dropbox.Dropbox({ accessToken: DROPBOX_TOKEN })

/**
 *
 * UploadPresentation
 *
 */
const UploadPresentation = () => {
  // Form State
  const { message: error, showMessage: showError } = useFlashMessage(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Upload Status
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)

  // Presentation Title options
  const [options, setOptions] = useState([])

  // Form data
  const [presentationType, setPresentationType] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [givenName, setGivenName] = useState(undefined)
  const [familyName, setFamilyName] = useState(undefined)
  const [unlistedPresentationTitle, setUnlistedPresentationTitle] = useState(undefined)
  const [presentationDate, setPresentationDate] = useState(undefined)
  const [presentationTime, setPresentationTime] = useState(undefined)
  const [presentation, setPresentation] = useState(undefined)
  const [videoFile, setVideoFile] = useState(undefined)
  const [notes, setNotes] = useState(undefined)

  const getPath = () => {
    const splitFile = document.getElementById('video_file').files[0].name.split('.')
    const fileExtension = splitFile[splitFile.length - 1]

    return `/${presentationType}s/${givenName}${familyName}_${
      DATES[presentationDate]
    }_${presentationTime.replace(' ', '')}.${fileExtension}`
  }

  const finishSubmission = airtableId => {
    // Reset form
    setTimeout(() => {
      document.getElementById('uploadPresentation-form').reset()
    }, 10)
    setPresentationType(undefined)
    setEmail(undefined)
    setGivenName(undefined)
    setFamilyName(undefined)
    setUnlistedPresentationTitle(undefined)
    setPresentationDate(undefined)
    setPresentationTime(undefined)
    setPresentation(undefined)
    setVideoFile(undefined)
    setNotes(undefined)

    // Reset select options
    setOptions([])

    setLoading(false)
    setSuccess(true)

    AIRTABLE_BASE(`${presentationType}s`).update(
      [
        {
          id: airtableId,
          fields: {
            'Uploaded to Dropbox?': true,
          },
        },
      ],
      err => {
        if (err) {
          console.error(err)
        }
      },
    )
  }

  const uploadPresentation = airtableId => {
    if (videoFile.size < UPLOAD_FILE_SIZE_LIMIT) {
      // File is smaller than 150 Mb - use filesUpload API
      return DROPBOX_CLIENT.filesUpload({
        path: getPath(),
        contents: videoFile,
      })
        .then(() => {
          setTotal(100)
          setCurrent(100)
          finishSubmission(airtableId)
        })
        .catch(() => {
          setLoading(false)
          showError('File upload failed')
        })
    }

    // File is bigger than 150 Mb - use filesUploadSession* API
    const workItems = []
    let offset = 0

    // Generate chunks
    while (offset < videoFile.size) {
      const chunkSize = Math.min(MAX_BLOB, videoFile.size - offset)
      workItems.push(videoFile.slice(offset, offset + chunkSize))
      offset += chunkSize
    }
    setTotal(workItems.length)

    const task = workItems.reduce((acc, blob, idx, items) => {
      if (idx === 0) {
        // Starting multipart upload of file
        return acc.then(() => {
          setCurrent(idx)

          return DROPBOX_CLIENT.filesUploadSessionStart({ close: false, contents: blob }).then(
            response => response.session_id,
          )
        })
      }
      if (idx < items.length - 1) {
        // Append part to the upload session
        return acc.then(sessionId => {
          setCurrent(idx)

          const cursor = { session_id: sessionId, offset: idx * MAX_BLOB }
          return DROPBOX_CLIENT.filesUploadSessionAppendV2({
            cursor,
            close: false,
            contents: blob,
          }).then(() => sessionId)
        })
      }

      // Last chunk of data, close session
      return acc.then(sessionId => {
        const cursor = { session_id: sessionId, offset: videoFile.size - blob.size }
        const commit = {
          path: getPath(),
          mode: 'add',
          autorename: true,
          mute: false,
        }
        finishSubmission(airtableId)
        return DROPBOX_CLIENT.filesUploadSessionFinish({ cursor, commit, contents: blob })
      })
    }, Promise.resolve())

    return task
      .then(() => {})
      .catch(() => {
        setLoading(false)
        showError('File upload failed')
      })
  }

  return (
    <>
      <Box
        background={{ image: `url(${header})`, size: 'contain' }}
        style={{ height: '20vh', width: '100vw', marginTop: 30 }}
      />

      <Box align="center" pad="large" data-testid="uploadPresentation-header">
        <Heading level="2">Submit Your Presentation Video</Heading>
        <Text size="small">
          If you have any issues uploading, please contact{' '}
          <Anchor href="mailto:emily@python.org">emily@python.org</Anchor>
        </Text>
      </Box>

      <Form
        id="uploadPresentation-form"
        validate="blur"
        onSubmit={e => {
          e.preventDefault()

          setLoading(true)

          AIRTABLE_BASE(`${presentationType}s`).create(
            [
              {
                fields: {
                  'Given Name': givenName,
                  'Family Name': familyName,
                  'Presentation Date': presentationDate,
                  'Presentation Name': presentation ? presentation.name : '',
                  'Unlisted Presentation Name': unlistedPresentationTitle,
                  Notes: notes,
                  'Presentation Time': presentationTime,
                  'Email Address': email,
                  'Dropbox File Name': getPath(),
                  'Schedule Link': presentation ? presentation.conf_url : '',
                },
              },
            ],
            (err, results) => {
              if (err) {
                showError('Could not process your submission. Please try again.')
                setLoading(false)
              } else {
                uploadPresentation(results[0].id)
              }
            },
          )
        }}
      >
        <FormField label="Presentation Type" name="presentation_type" required>
          <RadioButtonGroup
            direction="row"
            gap="xsmall"
            name="presentation_type"
            onChange={e => {
              setPresentationType(e.target.value)

              // Reset list of options based on type
              setOptions(TITLES_BY_CATEGORY[e.target.value])
              // Clear out selected talk since the available list has changed
              setPresentation('')
            }}
            options={['Talk', 'Charla', 'Tutorial', 'Education Summit']}
            value={presentationType}
          >
            {(option, { checked, hover }) => {
              let background = 'light-2'
              if (checked) background = 'brand'
              else if (hover) background = 'light-4'

              return (
                <Box background={background} pad="xsmall">
                  <Text weight="bold">{option}</Text>
                </Box>
              )
            }}
          </RadioButtonGroup>
        </FormField>

        <FormField
          label="Email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          required
          value={email}
          validate={[
            () => {
              if (email && !isEmail(email)) return 'Please enter a valid email address'
              return undefined
            },
          ]}
        >
          <TextInput name="email" type="email" />
        </FormField>

        <FormField
          label="Given Name"
          name="given_name"
          required
          value={givenName}
          onChange={e => setGivenName(e.target.value)}
        />

        <FormField
          label="Family Name"
          name="family_name"
          onChange={e => setFamilyName(e.target.value)}
          required
          value={familyName}
        />

        <FormField
          component={Select}
          disabled={!options}
          emptySearchMessage={`No matches found. ${
            !presentationType ? "Make sure you've selected a presentation type." : ''
          }`}
          help={
            <Text color="brand" style={{ fontSize: '11px' }} weight="bold">
              If your talk title is not listed, please use "Unlisted Presentation Title"
            </Text>
          }
          label="Presentation Title"
          labelKey="name"
          name="presentation_title"
          onChange={({ option }) => setPresentation(option)}
          onClose={() => setOptions(TITLES_BY_CATEGORY[presentationType])}
          options={options}
          onSearch={text => {
            // The line below escapes regular expression special characters:
            // [ \ ^ $ . | ? * + ( )
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

            // Create the regular expression with modified value which
            // handles escaping special characters. Without escaping special
            // characters, errors will appear in the console
            const exp = new RegExp(escapedText, 'i')
            setOptions(TITLES_BY_CATEGORY[presentationType].filter(o => exp.test(o.name)))
          }}
          placeholder="Select your talk title..."
          style={{ maxWidth: '70vw' }}
          value={presentation}
          valueKey={item => item}
        />

        <FormField
          label="Unlisted Presentation Title"
          name="unlisted_presentation_title"
          value={unlistedPresentationTitle}
          onChange={e => setUnlistedPresentationTitle(e.target.value)}
        />

        <FormField
          component={Select}
          label="Presentation Date"
          name="presentation_date"
          onChange={({ option }) => setPresentationDate(option)}
          options={Object.keys(DATES)}
          required
          value={presentationDate}
        />

        <FormField
          component={MaskedInput}
          label="Presentation Time"
          name="presentation_time"
          mask={[
            {
              length: [1, 2],
              options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              regexp: /^1[1-2]$|^[0-9]$/,
              placeholder: 'hh',
            },
            { fixed: ':' },
            {
              length: 2,
              options: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
              regexp: /^[0-5][0-9]$|^[0-9]$/,
              placeholder: 'mm',
            },
            { fixed: ' ' },
            {
              length: 2,
              options: ['am', 'pm'],
              regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
              placeholder: 'ap',
            },
          ]}
          onChange={e => setPresentationTime(e.target.value)}
          required
          value={presentationTime}
        />

        <FormField
          label="Video File"
          name="video_file"
          onChange={() => {
            const file = document.getElementById('video_file').files[0]
            setVideoFile(file)
          }}
          required
          value={videoFile}
        >
          <input type="file" id="video_file" name="video_file" accept="video/*" />
        </FormField>

        <FormField
          component={TextArea}
          help={
            <Text color="brand" style={{ fontSize: '11px' }} weight="bold">
              Please provide any links for slides or additional resources that you would like to be
              included in your talk description
            </Text>
          }
          label="Notes"
          name="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />

        <Box margin={{ vertical: 'large' }}>
          {/* Submit */}
          <Box direction="row" margin={{ vertical: 'medium' }}>
            <Button disabled={loading} label="Submit Presentation" primary type="submit" />
          </Box>

          {(loading || success) && (
            <Box fill="vertical">
              <Meter
                alignSelf="stretch"
                background="light-6"
                style={{ width: '100%' }}
                type="bar"
                values={[
                  {
                    value: (current / total) * 100,
                    color: 'brand',
                  },
                  {
                    value: ((total - current) / total) * 100,
                    color: 'light-6',
                  },
                ]}
              />
            </Box>
          )}

          {/* Status Messages */}
          {loading && (
            <Message message="Your file is uploading. This may take a while depending on the size of the file. Please be patient!" />
          )}
          {success && <Message message="Your submission has been received!" />}
          {error && <Message message={error} isError />}
        </Box>
      </Form>
    </>
  )
}

export default UploadPresentation
