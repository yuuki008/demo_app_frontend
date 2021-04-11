import TextInput from '../uikit/TextInput'
import PrimaryButton from '../uikit/PrimaryButton'
import styled from 'styled-components'
import Router from 'next/router'
import { useSignupContext } from './Context'

export const Layout = () => {
  const context = useSignupContext()
  return (
    <Wrapper className="c-section-container">
      <SignUpTitle className="u-text-center u-text__headline">サインアップ</SignUpTitle>
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={context.username}
        type={'text'}
        onChange={context.onChangeUsername}
      />
      <TextInput
        fullWidth={true}
        label={'ニックネーム'}
        multiline={false}
        required={true}
        rows={1}
        value={context.nickname}
        type={'text'}
        onChange={context.onChangeNickname}
      />
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
      <TextInput
        fullWidth={true}
        label={'再確認パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={context.passwordConfirmation}
        type={'password'}
        onChange={context.onChangePasswordConfirmation}
      />
      <SpaceMedium className="module-spacer--medium" />
      <WrapperCenter className="center">
        <PrimaryButton
          label={context.isPosting ? 'サインアップ中...' : 'サインアップ'}
          onClick={() =>
              context.onSubmit()
          }
        />
        <SpaceMedium className="module-spacer--medium" />
        <PageJump onClick={() => Router.push('/sign_in')}>アカウントをお持ちの方はこちら</PageJump>
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
