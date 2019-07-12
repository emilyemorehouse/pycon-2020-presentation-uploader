import { ignore } from 'mobx-sync'
import { locale } from './LocaleStore'
import { github } from './GithubStore'

export class RootStore {
  @ignore storeLoaded = false

  locale = locale

  github = github
}

export const store = new RootStore()
