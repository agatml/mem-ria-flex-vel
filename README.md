# Memória Flexível

Crie um app web de flashcards chamado "Memora", em português do Brasil, para estudar com cartões de frente e verso.

FUNCIONALIDADES:
1. CARTÕES: formulário para criar um cartão com "Frente" (pergunta) e "Verso" (resposta), ambos obrigatórios, com mensagem de erro amigável se vazios. Lista dos cartões criados, cada um com botões para editar (abrir um modal de edição) e excluir (com confirmação).
2. REVISÃO: modo de estudo que mostra um cartão por vez, na ordem embaralhada a cada sessão.
   - O cartão começa mostrando a frente. Ao clicar nele ou no botão "Virar" (ou apertar a tecla Espaço), vira com uma animação suave e mostra o verso.
   - Com o verso visível, aparecem dois botões: "Acertei" (verde) e "Errei" (vermelho). Ao clicar, avança para o próximo cartão.
   - Mostrar o progresso ("Cartão 3 de 10") e uma barra de progresso.
   - Ao terminar, mostrar um resumo: total de acertos, erros e porcentagem de acerto, com os botões "Revisar tudo de novo" e "Revisar só os que errei" (este desabilitado se não houve erros).
   - Se não houver cartões, mostrar uma mensagem amigável com um botão que leva à criação.
3. NAVEGAÇÃO: duas abas ou seções no topo, "Cartões" e "Revisar", com um contador do total de cartões.
4. PERSISTÊNCIA: salvar os cartões no localStorage para que continuem ao recarregar a página. Tratar erros de leitura/escrita do localStorage sem quebrar o app.

DESIGN:
- Visual limpo e moderno, fundo #F8FAFC, cards brancos com cantos arredondados e sombra leve, texto escuro #0F172A.
- Cor principal índigo #4F46E5; verde #16A34A para "Acertei" e vermelho #DC2626 para "Errei".
- O cartão de revisão deve ser grande, centralizado e com texto legível.
- Totalmente responsivo, funcionando bem no celular.
- Cursor de mãozinha em tudo que for clicável.

REGRAS:
- Não use backend, banco de dados nem login.
- Não crie decks, busca, modo escuro, estatísticas históricas nem outras funcionalidades além das descritas.
- Mantenha o código organizado em componentes separados e reutilizáveis, com os tipos TypeScript bem definidos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c2898e65-423a-4685-bec8-75fc546e2866).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
