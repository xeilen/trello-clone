import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'Some example description',
          name: 'first task',
          id: 5,
          userAssigned: null,
          checked: false
        },
        {
          description: '',
          name: 'second task',
          id: '2',
          userAssigned: null,
          checked: false
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null,
          checked: false
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          checked: false
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
          checked: false
        }
      ]
    }
  ]
}
