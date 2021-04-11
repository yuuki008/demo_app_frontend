import TextInput from '../uikit/TextInput'
import PrimaryButton from '../uikit/PrimaryButton'
import styled from 'styled-components'
import Router from 'next/router'
import { useSigninContext } from './Context'

export const Layout = () => {
  const context = useSigninContext()
  return (
    <Wrapper className="c-section-container">
      <SignUpTitle className="u-text-center u-text__headline">サインイン</SignUpTitle>
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={context.email}
        type={'text'}
        onChange={context.onChangeEmail}
      />

      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={context.password}
        type={'password'}
        onChange={context.onChangePassword}
      />
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton
          label={context.isPosting ? 'サインイン中...' : 'サインイン'}
          onClick={() =>
              context.onSubmit()
          }
        />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => Router.push('/sign_up')}>ユーザー登録がお済みでない方はこちら</PageJump>
        <SpaceMedium className="module-spacer--small" />
        <PageJump onClick={() => Router.push('/reset')}>パスワードを忘れた方はこちら</PageJump>
      </WrapperCenter>
    </Wrapper>
  )
}

const SignUpTitle = styled.div({
  fontWeight: 600,
})
const Wrapper = styled.div``
const WrapperCenter = styled.div``
const SpaceMedium = styled.div``
const PageJump = styled.div``
