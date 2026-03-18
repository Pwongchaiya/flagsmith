import React, { FC } from 'react'
import Button from 'components/base/forms/Button'
import Tooltip from 'components/Tooltip'
import Constants from 'common/constants'
import { useHasPermission } from 'common/providers/Permission'
import {
  useCreateServersideEnvironmentKeysMutation,
  useDeleteServersideEnvironmentKeysMutation,
  useGetServersideEnvironmentKeysQuery,
} from 'common/services/useServersideEnvironmentKey'
import { useGetEnvironmentsQuery } from 'common/services/useEnvironment'
import CreateServerSideKeyModal from './CreateServerSideKeyModal'
import ServerSideKeyRow from './ServerSideKeyRow'

type ServerSideSDKKeysProps = {
  environmentId: string
  projectId: string
}

const ServerSideSDKKeys: FC<ServerSideSDKKeysProps> = ({
  environmentId,
  projectId,
}) => {
  const { permission: isAdmin } = useHasPermission({
    id: environmentId,
    level: 'environment',
    permission: 'ADMIN',
  })

  const { data: keys, isLoading } = useGetServersideEnvironmentKeysQuery(
    { environmentId },
    { skip: !environmentId },
  )

  const { data: environments } = useGetEnvironmentsQuery(
    { projectId: parseInt(projectId, 10) },
    { skip: !projectId },
  )

  const [createKey] = useCreateServersideEnvironmentKeysMutation()
  const [deleteKey, { isLoading: isDeleting }] =
    useDeleteServersideEnvironmentKeysMutation()

  const environmentName =
    environments?.results?.find((env) => env.api_key === environmentId)?.name ??
    ''

  const handleCreate = () => {
    openModal(
      'Create Server-side Environment Keys',
      <CreateServerSideKeyModal
        environmentName={environmentName}
        onSubmit={(name) => {
          createKey({
            data: { name },
            environmentId,
          }).then(() => {
            closeModal()
          })
        }}
      />,
      'p-0',
    )
  }

  const handleRemove = (id: string, name: string) => {
    openConfirm({
      body: (
        <div>
          Are you sure you want to remove the SDK key <strong>{name}</strong>?
          This action cannot be undone.
        </div>
      ),
      destructive: true,
      onYes: () => {
        deleteKey({ environmentId, id })
      },
      title: 'Delete Server-side Environment Keys',
      yesText: 'Confirm',
    })
  }

  return (
    <FormGroup className='my-4'>
      <div className='col-md-6'>
        <h5 className='mb-2'>Server-side Environment Keys</h5>
        <p className='fs-small lh-sm mb-0'>
          Flags can be evaluated locally within your own Server environments
          using our{' '}
          <Button
            theme='text'
            href='https://docs.flagsmith.com/clients/overview#server-side-sdks'
            target='__blank'
          >
            Server-side Environment Keys
          </Button>
          .
        </p>
        <p className='fs-small lh-sm mb-0'>
          Server-side SDKs should be initialised with a Server-side Environment
          Key.
        </p>
        {isAdmin ? (
          <Button onClick={handleCreate} className='my-4'>
            Create Server-side Environment Key
          </Button>
        ) : (
          <Tooltip
            title={
              <Button className='my-4' disabled>
                Create Server-side Environment Key
              </Button>
            }
            place='right'
          >
            {Constants.environmentPermissions('ADMIN')}
          </Tooltip>
        )}
      </div>
      {isLoading && (
        <div className='text-center'>
          <Loader />
        </div>
      )}
      {keys && !!keys.length && (
        <PanelSearch
          id='org-members-list'
          title='Server-side Environment Keys'
          className='no-pad'
          items={keys}
          filterRow={(item: { name: string }, search: string) => {
            const strToSearch = `${item.name}`
            return (
              strToSearch.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
          }}
          renderRow={({
            id,
            key,
            name,
          }: {
            id: string
            key: string
            name: string
          }) => (
            <ServerSideKeyRow
              id={id}
              keyValue={key}
              name={name}
              isDeleting={isDeleting}
              onRemove={handleRemove}
            />
          )}
        />
      )}
    </FormGroup>
  )
}

export default ServerSideSDKKeys
