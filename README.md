# Vieira Visuals

Site de **Vieira Visuals**, a assinatura de Lucas Vieira, videomaker no Algarve.
Slogan: *visuais à medida de cada história.*

Identidade visual de 2026 por Brandingift (Davi Magalhães e Sofia Fragoso).

## Marca

| Cor | Hex | Uso no site |
| --- | --- | --- |
| Mogno Escuro | `#4C1600` | secção do processo, menu móvel, sombras quentes |
| Linho Verde | `#E5E8D3` | texto principal, secção do manifesto |
| Âmbar | `#FFB116` | botões principais e destaques |
| Oliva | `#836C36` | rótulos e detalhes |
| Chocolate | `#563718` | texto secundário em fundo claro |

Tipografia: **Manrope** (corporativa). O logótipo usa Delirium NCV e entra sempre como SVG.
Elementos gráficos: enquadramento de câmara, enquadramento com as mãos (bandeiras) e formas geométricas.

## Estrutura

```
index.html                 Página única. O texto em português vive aqui (é o que o Google lê)
styles.css                 Sistema visual, mobile-first
script.js                  Tradução inglesa, vídeo do hero, filtros, leitor de vídeo
assets/brand/              Logótipo e assinatura (SVG originais da marca)
assets/img/                Posters do hero e fotos do Lucas
assets/video/              Vídeos do portefólio (1080p, H.264) e versões leves do hero
assets/video/posters/      Primeiro frame de cada vídeo
tests/                     Teste de regressão
```

O material fonte da marca (PDF do manual e ZIP com os elementos) fica fora do repositório
(ver `.gitignore`).

## Adicionar um vídeo

1. Converter para 1080p, 30 fps, H.264 com `faststart`, por exemplo:
   `ffmpeg -i entrada.mov -vf scale=1920:1080,fps=30 -c:v libx264 -crf 25 -movflags +faststart -c:a aac -b:a 112k assets/video/nome.mp4`
2. Tirar um poster para `assets/video/posters/nome.jpg`.
3. Copiar um bloco `<article class="work">` em `index.html` e ajustar `data-cat`, `data-o` (`h` ou `v`) e os textos.
4. Acrescentar a tradução inglesa (`wN.c` e `wN.t`) em `script.js`.

## Verificar

```bash
node tests/site-regression.test.mjs
```

## Rodar localmente

```bash
python3 -m http.server 4174
```

## Publicação

GitHub Pages a partir da branch `main`: https://x1emportugal.github.io/vieira-visuals/
A versão anterior ficou guardada na tag `v1-premium-dark`.
