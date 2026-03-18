import React, { FC } from 'react'
import Button from 'components/base/forms/Button'
import Icon from 'components/Icon'
import Token from 'components/Token'
import Utils from 'common/utils/utils'

type ServerSideKeyRowProps = {
  id: string
  keyValue: string
  name: string
  isDeleting: boolean
  onRemove: (id: string, name: string) => void
}

const ServerSideKeyRow: FC<ServerSideKeyRowProps> = ({
  id,
  isDeleting,
  keyValue,
  name,
  onRemove,
}) => {
  return (
    <Row className='list-item'>
      <Flex className='table-column px-3 font-weight-medium'>{name}</Flex>
      <div className='table-column'>
        <Token style={{ width: 280 }} token={keyValue} />
      </div>
      <Button
        onClick={() => {
          Utils.copyToClipboard(keyValue)
        }}
        className='ml-2 btn-with-icon'
      >
        <Icon name='copy' width={20} fill='#656D7B' />
      </Button>
      <div className='table-column'>
        <Button
          onClick={() => onRemove(id, name)}
          disabled={isDeleting}
          id='remove-feature'
          className='btn btn-with-icon'
        >
          <Icon name='trash-2' width={20} fill='#656D7B' />
        </Button>
      </div>
    </Row>
  )
}

export default ServerSideKeyRow
