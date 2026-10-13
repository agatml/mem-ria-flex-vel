# Memora — Flashcards de estudo

Aplicação web para criar cartões de estudo (frente e verso) e revisá-los de forma rápida, com acompanhamento do resultado a cada sessão. Os dados ficam salvos no próprio navegador.

**🔗 Demo:** `https://smart-card-station.lovable.app/`

> Projeto pessoal, construído de forma incremental com **Lovable**, em versões pequenas que evoluem a cada etapa.

---

## 📌 Roadmap

| Versão | O que entra | Situação |
|---|---|---|
| **v1** | Criar, editar e excluir cartões; modo de revisão com "Acertei/Errei"; resumo da sessão; dados no `localStorage` | ✅ Concluída |
| **v1.1** | Paleta em tons de verde e alternância entre tema claro e escuro | ✅ Concluída |
| **v2** | Decks por assunto, busca e embaralhar | ⏳ Planejada |
| **v3** | Revisão espaçada simples: cartões errados voltam antes | ⏳ Planejada |
| **v4** | Estatísticas e gráficos de progresso | ⏳ Planejada |
| **v5** | Login e banco de dados, para estudar em qualquer aparelho | ⏳ Planejada |
| **v6** | Importar e exportar decks (CSV) | ⏳ Planejada |

---

## ✨ Funcionalidades

**Cartões**
- Criar cartões com frente (pergunta) e verso (resposta), com validação de campos vazios
- Editar (em modal) e excluir (com confirmação)

**Revisão**
- Um cartão por vez, em ordem embaralhada a cada sessão
- Virar o cartão por clique, botão "Virar" ou tecla **Espaço**, com animação
- Registro de **Acertei** e **Errei**, com contador ("Cartão 3 de 10") e barra de progresso
- Resumo final com acertos, erros e porcentagem
- Opção de revisar tudo de novo ou **apenas os cartões errados**

**Interface**
- Paleta em tons de verde
- Tema claro e escuro, com preferência do sistema na primeira visita e escolha salva
- Layout responsivo (desktop e celular)
- Mensagens amigáveis quando não há cartões

**Persistência**
- Cartões salvos no `localStorage`, com tratamento de erros de leitura e escrita

> ℹ️ Os dados ficam apenas no navegador usado: limpar os dados do site ou trocar de aparelho apaga ou separa os cartões. O login e o banco de dados estão previstos para a v5.



## 🛠️ Tecnologias

- **Lovable** — geração e iteração da aplicação por prompts
- **React + TypeScript + Tailwind CSS** — stack gerada pelo Lovable 
- **localStorage** — persistência dos dados no navegador
- **GitHub** — controle de versão

## ▶️ Como rodar localmente

```bash
git clone https://github.com/agatml/mem-ria-flex-vel.git
cd mem-ria-flex-vel
npm install
npm run dev
```

---

## 🧠 Processo de desenvolvimento

Construído em ciclos de **prompt → teste → correção**, com registro de cada etapa.

| Nº | Prompt (resumo) | Resultado | Problema encontrado | Correção | Créditos |
|---|---|---|---|---|---|
| 1 | v1 completa: cartões, modo de revisão, resumo da sessão, persistência local e design responsivo | Funcionou | — | — | 2,10 |
| 2 | Paleta em tons de verde e alternância de tema claro/escuro, com tema aplicado antes da renderização e variáveis de cor | Implementado | — | — | 2 |

### Boas práticas adotadas

- **Escopo pequeno por versão:** cada etapa entrega algo usável, e as funcionalidades futuras ficam explicitamente fora do prompt.
- **Sem backend na v1:** o `localStorage` mantém o custo baixo e deixa o banco de dados para quando o app já valer a pena.
- **Funcionalidades numeradas, com o comportamento de cada botão descrito**, o que reduz retrabalho.
- **Tipos TypeScript e componentes separados**, facilitando trocar o `localStorage` por um banco de dados na v5.
- **Cores em hexadecimal e variáveis de tema**, evitando cores fixas espalhadas pelos componentes.
- **Acessibilidade:** `aria-label` nos botões de ícone, atalho de teclado e distinção de "Acertei/Errei" também por ícone, e não só por cor.

### Aprendizados

- Um prompt com comportamento detalhado de cada ação gera resultado melhor na primeira tentativa.
- Mudanças visuais amplas (paleta e tema) tocam muitos arquivos; usar variáveis de cor ajuda a manter o custo previsível.
- Aplicar o tema antes da renderização evita o "flash" de cor errada no carregamento.

---

## 🗺️ Próximos passos

- [ ] v2: decks por assunto, busca e embaralhar
- [ ] v3: revisão espaçada
- [ ] v4: estatísticas e gráficos
- [ ] v5: login e banco de dados
- [ ] v6: importar e exportar CSV

---

## 📄 Licença

Projeto pessoal, sem fins comerciais.
