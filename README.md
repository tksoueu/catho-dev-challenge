## Para iniciar o projeto

Primeiramente, rode o docker compose em um terminal na raíz do projeto.

```bash
npm run docker-compose
# ou
yarn docker-compose
```

Se ocorrer certo, você poderá entrar em [http://localhost:8080](http://localhost:8080) para checar a página do adminer do banco.
As credenciais são:
```bash
host: "localhost"
user: "user"
password: "senha"
database: "catho"
```

Após isso, já se pode rodar
```bash
npm run dev
# ou
yarn dev
```
Para que o aplicativo seja colocado em ambiente de desenvolvimento.

Na tela inicial possuímos 2 botões onde ao clicar somos redirecionados para a página de adicionar novo candidato `pages/api/candidates.tsx` ou para buscar candidato `pages/api/search.tsx`.

A tela de adicionar candidatos permite adicionar um novo candidato, informando nome e skills (na quantidade desejada, porém sendo obrigatório ao menos uma) no banco. Já a tela de busca permite buscar os candidatos por skills (também quantas desejar, sendo obrigatório ao menos uma).

Para isso são utilizadas requisições GET e POST na api local.

Os testes podem ser rodados utilizando
```bash
npm run test
# ou
yarn test
```

## Como este repositório será fechado e não são informações sigilosas, mantive o arquivo .env fora do .gitignore, para facilitar a utilização do sistema.

## Os arquivos de teste estão prontos para testar as rotas da api, o service e os componentes, porém a configuração do Jest está aparentemente errada e não encontrei uma forma de consertá-la ainda.
