import React, { FC, FormEvent, useEffect, useState } from 'react'
import Button from 'components/base/forms/Button'
import ModalHR from 'components/modals/ModalHR'
import Utils from 'common/utils/utils'

type CreateServerSideKeyModalProps = {
  environmentName: string
  onSubmit: (name: string) => void
}

const CreateServerSideKeyModal: FC<CreateServerSideKeyModalProps> = ({
  environmentName,
  onSubmit,
}) => {
  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('jsTokenName')?.focus()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    Utils.preventDefault(e)
    if (name) {
      setIsSaving(true)
      onSubmit(name)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='modal-body'>
          <div className='mb-2'>
            This will create a Server-side Environment Key for the environment{' '}
            <strong>{environmentName}</strong>.
          </div>
          <InputGroup
            title='Key Name'
            placeholder='New Key'
            className='mb-2'
            id='jsTokenName'
            inputProps={{
              className: 'full-width modal-input',
            }}
            onChange={(e: InputEvent) => setName(Utils.safeParseEventValue(e))}
          />
        </div>
        <ModalHR />
        <div className='modal-footer'>
          <Button onClick={closeModal} theme='secondary' className='mr-2'>
            Cancel
          </Button>
          <Button type='submit' disabled={!name || isSaving}>
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateServerSideKeyModal
