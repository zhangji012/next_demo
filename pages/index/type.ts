export type StoreState = {
  counter: IHomeStore
}

export type StoreDispatch = {
  increment: () => void
}

export type OwnProps = {}

export type Props = StoreState & StoreDispatch & OwnProps

export type State = {
}
