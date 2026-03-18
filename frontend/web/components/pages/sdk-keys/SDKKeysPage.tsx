import React, { FC } from 'react'
import Button from 'components/base/forms/Button'
import Input from 'components/base/forms/Input'
import Icon from 'components/Icon'
import PageTitle from 'components/PageTitle'
import Utils from 'common/utils/utils'
import { useRouteMatch } from 'react-router-dom'
import { ServerSideSDKKeys } from './components'

interface RouteParams {
  environmentId: string
  projectId: string
}

const SDKKeysPage: FC = () => {
  const match = useRouteMatch<RouteParams>()
  const environmentId = match?.params?.environmentId
  const projectId = match?.params?.projectId

  return (
    <div
      data-test='segments-page'
      id='segments-page'
      className='app-container container'
    >
      <PageTitle title='Client-side Environment Key'>
        Use this key to initialise{' '}
        <Button
          theme='text'
          href='https://docs.flagsmith.com/clients/overview#client-side-sdks'
          target='__blank'
        >
          Client-side
        </Button>{' '}
        SDKs.
      </PageTitle>
      <div className='col-md-6'>
        <Row>
          <Flex>
            <Input
              value={environmentId}
              inputClassName='input input--wide'
              type='text'
              title={<h3>Client-side Environment Key</h3>}
              placeholder='Client-side Environment Key'
            />
          </Flex>
          <Button
            onClick={() => {
              Utils.copyToClipboard(environmentId)
            }}
            className='ml-2 btn-with-icon'
          >
            <Icon name='copy' width={20} fill='#656D7B' />
          </Button>
        </Row>
      </div>
      <hr className='py-0 my-4' />
      <ServerSideSDKKeys environmentId={environmentId} projectId={projectId} />
    </div>
  )
}

export default SDKKeysPage
