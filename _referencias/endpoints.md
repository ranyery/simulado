### Lista de possíveis endpoints para a api de usuário

- POST /api/register
- POST /api/login
- POST /api/forgot-password
- POST /api/reset-password
- POST /api/validate-token
- GET /api/profile
- PUT /api/profile
- POST /api/logout
- POST /api/revoke-token
- GET /api/devices
- DELETE /api/account
- GET /api/users
- GET /api/users/{id}
- GET /api/users/search?q={query}
- POST /api/users/{id}/permissions
- GET /api/activity-log
- POST /api/users/{id}/profile-picture
- GET /api/notifications
- POST /api/messages
- GET /api/settings
- POST /api/social-login
- GET /api/dashboard
- POST /api/integrations
- POST /api/support/ticket
- GET /api/analytics

1. `GET /users`: Lista todos os usuários.
2. `GET /users/{id}`: Obtém detalhes de um usuário específico pelo ID.
3. `PUT /users/{id}`: Atualiza os dados de um usuário específico.
4. `DELETE /users/{id}`: Exclui um usuário específico.

5. `GET /users/{id}/permissions`: Obtém as permissões de um usuário específico.
6. `PUT /users/{id}/permissions`: Atualiza as permissões de um usuário específico.
7. `GET /users/{id}/roles`: Obtém os papéis (roles) de um usuário específico.
8. `PUT /users/{id}/roles`: Atualiza os papéis (roles) de um usuário específico.

9. `POST /users/permissions`: Cria uma nova permissão.
10. `GET /users/{id}/permissions/{permissionId}`: Obtém detalhes de uma permissão específica para um usuário.
11. `PUT /users/{id}/permissions/{permissionId}`: Atualiza uma permissão específica para um usuário.
12. `DELETE /users/{id}/permissions/{permissionId}`: Remove uma permissão específica de um usuário.
13. `GET /users/{id}/roles/{roleId}`: Obtém detalhes de um papel específico para um usuário.
14. `PUT /users/{id}/roles/{roleId}`: Atualiza um papel específico para um usuário.
15. `DELETE /users/{id}/roles/{roleId}`: Remove um papel específico de um usuário.

16. `GET /users/count`: Obtém o número total de usuários no sistema.
17. `GET /users/active`: Lista todos os usuários ativos.
18. `GET /users/inactive`: Lista todos os usuários inativos.

19. `GET /users/by-role/{roleId}`: Lista todos os usuários com um papel específico.
20. `GET /users/export/csv`: Exporta a lista de usuários para um arquivo CSV.
21. `GET /users/{id}/reset-password`: Envia um e-mail de redefinição de senha para um usuário.

---

1. `POST /auth/register`: Registra um novo usuário no sistema.
2. `POST /auth/login`: Inicia uma sessão de autenticação para o usuário.
3. `POST /auth/logout`: Encerra a sessão de autenticação atual.
4. `POST /auth/refresh-token`: Gera um novo token de acesso com base em um token de atualização.
5. `POST /auth/forgot-password`: Envia um e-mail para redefinir a senha do usuário.
6. `POST /auth/reset-password`: Redefine a senha do usuário com base em um token de redefinição de senha.
7. `GET /auth/user-profile`: Obtém o perfil do usuário autenticado.
8. `PUT /auth/update-profile`: Atualiza o perfil do usuário autenticado.
9. `GET /auth/verify-email`: Verifica o endereço de e-mail de um usuário com base em um token de verificação.
10. `POST /auth/resend-verification-email`: Reenvia o e-mail de verificação para o usuário.
11. `GET /auth/two-factor-auth-setup`: Obtém informações e configurações de autenticação de dois fatores para o usuário autenticado.
12. `POST /auth/two-factor-auth-setup`: Configura a autenticação de dois fatores para o usuário autenticado.
13. `PUT /auth/two-factor-auth-disable`: Desativa a autenticação de dois fatores para o usuário autenticado.
14. `POST /auth/two-factor-auth-verify`: Verifica um código de autenticação de dois fatores.
15. `POST /auth/change-password`: Altera a senha do usuário autenticado.
16. `GET /auth/roles`: Lista todos os papéis (roles) disponíveis para autenticação.
17. `POST /auth/impersonate`: Permite que um administrador assuma a identidade de outro usuário para fins de suporte.
18. `POST /auth/revoke-token`: Revoga um token de acesso específico, deslogando o usuário associado.
19. `POST /auth/logout-all-devices`: Encerra a sessão de autenticação em todos os dispositivos do usuário.
20. `GET /auth/audit-logs`: Obtém registros de auditoria relacionados a ações de autenticação e autorização.
