# 💬 Project Name

## ✳️ Objetivo
Criar uma API para criação de pautas para votação.


## Requisitos técnicos

Cadastrar uma nova pauta;


Abrir uma sessão de votação em uma pauta (a sessão de votação deve ficar aberta por um tempo determinado na chamada de abertura ou 1 minuto por default);


Receber votos dos associados em pautas (os votos são apenas 'Sim'/'Não'. Cada associado é identificado por um id único e pode votar apenas uma vez por pauta);


Contabilizar os votos e dar o resultado da votação na pauta.

Para fins de exercício, a segurança das interfaces pode ser abstraída e qualquer chamada para as interfaces pode ser considerada como autorizada. A escolha da linguagem, frameworks e bibliotecas é livre (desde que não infrinja direitos de uso). É importante que as pautas e os votos sejam persistidos e que não sejam perdidos com o restart da aplicação.
---

## 🛠 Ferramentas Utilizadas

- [Node](https://nodejs.dev)
- [Express](https://expressjs.com/pt-br/)
- [Mysql](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io)

---

## 💻 Clonando o repositório

- Clone o projeto

  ```bash
  git clone git@github.com:filipedev040990/desafio-backend-magalu.git
  ```

---

## 🏠 Adicionando variáveis de ambiente (.env)

Existe o arquivo `.env.example` com todas as variáveis utilizadas para rodar o sistema. Faça uma cópia desse arquivo e renomeie a cópia para `.env` antes de executar o comando para iniciar a aplicação.

---

## ▶️ Executando o projeto

- Execute o seguinte comando.

  ```bash
    docker compose up -d
  ```

- Utilize o comandos abaixo para verificar se os containers (notifications, database) estão todos rodando.

  ```bash
    docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
  ```

- Utilize o comandos abaixo para acompanhar os logs do serviço order.
  ```bash
    docker logs -f notifications
  ```

---

## Dependências para a execução

Basta ter o docker instalado em sua máquina para executar os containers.

---

## Logs 🖥

Sempre que o serviço ler uma mensagem da fila, ele emitirá um log com informações sobre.
![alt text](image-2.png)

---

## 🧩 Swagger

É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api-docs) e simular os endpoints

---

## 🧪 Testes:

- Rodar todos os testes
  ```bash
  npm t
  ```

---

## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
2. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);

- Padrão no desenvolvimento de um card:
  > tipo(#numero_do_card): descrição em inglês (em letras minúsculas)
- Padrão de desenvolvimento não relacionado a cards
  > tipo(escopo): descrição em inglês (em letras minúsculas)

Exemplos de tipos:

- feat: introduz uma nova funcionalidade à base de código;
- fix: correção de um bug na base de código;
- build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
- chore: atualização de ferramentas, configurações e bibliotecas
- ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
- docs: Alterações na documentação
- style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
- refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
- perf: Um mundança no código que melhora a performance
- test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:

```bash
git commit -m "feat(#300): creating auth service"
git commit -m "fix(#30): correcting product type"
git commit -m "style(lint): removing some lint warnings"
git commit -m "docs(readme): removing deploy section from readme"
```

---
