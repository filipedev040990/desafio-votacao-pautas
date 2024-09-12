## Cadastrar uma pauta
✅ Entidade
✅ Usecase
✅ Controller
✅ Gateway

## Editar uma pauta
✅ Usecase
✅ Controller
✅ Gateway

## Deletar uma pauta
✅ Entidade
✅ Usecase
✅ Controller
✅ Gateway

## Listar uma pauta
⛔ Entidade
⛔ Usecase
⛔ Controller
⛔ Gateway

```{
  id: 'string'
  name: 'string'
  description: 'string'
  createdAt: '2024-09-11 15:45:52'
  updatedAt: '2024-09-11 15:45:52'
  motionVoting: {
    startVoting: '2024-09-13 15:00:00'
    endVoting: '2024-09-15 00:00:00'
    createdAt: '2024-09-13 15:00:00'
    updatedAt: '2024-09-13 15:00:00'
  },
  resultMotionVoting: [
    totalVotes: 100
    finalResult: 'SIM'
    {
      value: 'SIM'
      total: 70
      percent: 70
    },
    {
      value: 'NÃO'
      total: 30
      percent: 30
    }
  ]
}
```


## Listar todas as pautas
⛔ Entidade
⛔ Usecase
⛔ Controller
⛔ Gateway

```
{
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
```


✅⛔