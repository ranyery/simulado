- [x] Se a "Disciplina" tiver "Tópico" associado, não pode ser excluída do banco
- [] Adicionar author na entidade Subject (disciplina) para rastrear quem foi o responsável pela criação
- [] Se o usuário que está criando for ADMIN, então ele pode deixar o status como "Aprovado", caso contrário o status deve ficar como "pendente de aprovação"
- [x] Adicionar funções de atualizar horário do Subject ao salvar no banco de dados
- [] Adicionar validação para identificar se o usuário pode utilizar as funções => Falta adicionar no back
- [x] Adicionar Roles no JWT

- [] Criar uma classe base para a storage local e de seção
- [] Validar a possibilidade de deixar o create, update e delete da IEntityPermission como opcionais

- tem algum problema que precisa ficar fazendo reload no login, precisa buscar a informação novamente no banco

- [] Adicionar função "refresh-token" no front-end
- [] Pensar sobre trocar o nome da função "token.service.ts" no Server para auth-service
- [] Validar se o token está expirado, se sim atualizar com o /refresh-token

### DOING:

- [x] Criar uma entidade lá no domain apenas para TOPIC, adicionar createdAt e updatedAt e status
- [x] Atualizar Schemas da entidade Topic
