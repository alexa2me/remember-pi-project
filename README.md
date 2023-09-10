
# REMEMBER

## Sobre o projeto

[Acesse a plataforma aqui](https://remember-pi-project-front.vercel.app/)

Remember é uma aplicação full stack web desenvolvido como exigência do trabalho
de Projeto Integrador para a obtenção de nota parcial para o 5° semestre do curso de
Tecnologia em Análise e Desenvolvimento de Sistemas.
A aplicação consiste na ideia de fornecer uma plataforma para que as pessoas
possam armazenar suas memórias e lembranças mais preciosas/valiosas em um só lugar e em
dias diceis possam retornar à plataforma para relembrar os bons momentos.

---
### Tecnologias
- NodeJs
- React 18
- Chakra UI
- Express 4
- MySQL
- DotEnv

---

## Para instalar o projeto

    $ git clone https://github.com/alexa2me/remember-pi-project.git
    $ cd remember-pi-project
    $ npm install

---
## Variáveis de entorno

Copie o arquivo .env.sample em um novo arquivo com o formato .env e
preencha os valores das variáveis de entorno

    $ DB_HOST =
    $ DB_USER =
    $ DB_PASSWORD = 
    $ DB_DATABASE_NAME =
    $ JWT_KEY =
    $ PORT =
    $ ACCESS_TOKEN_EXPIRES_IN =

---

## Compilar o projeto para deploy

Quando se realiza uma mudança no código fonte é necessário gerar uma nova versão da pasta dist. 
Execute os seguintes comandos:

```ssh
    // Mude para a pasta api
    $ cd api
    // Faça um comando build
    $ npm run build
```
---
## Desenvolvedores
- ALEXANDRA GONÇALVES ALCANTARA
- ALINE DE CASTRO HERCULANO
- ARTHUR VIEIRA FELIPE
- BRUNO DE JESUS SANTANA SOUSA