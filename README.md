# Vieira.Visuals

Site portfólio de **Vieira.Visuals** — Direção Criativa, Vídeo e IA.

Aftermovies, filmes de marca e cobertura de eventos.

## Stack

Site estático — HTML, CSS e JavaScript puro, sem dependências ou build. Fontes via Google Fonts (Bodoni Moda + Jost).

## Estrutura

```
index.html        Página única com todas as seções
styles.css        Reset, variáveis de tema e regras responsivas
script.js         Menu mobile, parallax do hero, autoplay de vídeo, reel do álbum
assets/photos/    Fotos do álbum (otimizadas para web)
assets/videos/    Vídeos dos cases e do hero (720p)
```

## Rodar localmente

Qualquer servidor estático serve. Por exemplo:

```bash
python3 -m http.server 4174
```

Depois abra http://localhost:4174.

## Deploy

Publicado na Vercel a partir da branch `main` — cada push atualiza o site automaticamente.
