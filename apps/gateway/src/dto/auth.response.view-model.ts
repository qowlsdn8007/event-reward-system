import { Props } from '../props'

export class LoginViewModel {
  readonly accessToken: string

  constructor(props: Props<LoginViewModel>) {
    this.accessToken = props.accessToken
  }
}

export class RegisterViewModel {
  readonly id: string
  readonly username: string
  readonly role: string

  constructor(props: Props<RegisterViewModel>) {
    this.id = props.id
    this.username = props.username
    this.role = props.role
  }
}

export class EditRoleViewModel {
  readonly id: string
  readonly username: string
  readonly role: string

  constructor(props: Props<EditRoleViewModel>) {
    this.id = props.id
    this.username = props.username
    this.role = props.role
  }
}
