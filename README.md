# Plano Habitar Caçador

**Site:** https://viniic22.github.io/site-rafa-e-vini/

Site institucional do Plano Habitar Caçador — uma iniciativa para facilitar o acesso à moradia digna e economicamente viável em Caçador (SC), voltada a moradores com dificuldade de encontrar aluguel acessível e a estudantes vindos de outras cidades.

## Responsáveis

- Rafael Matheus Leismann
- Vinicius Corrêa

## Páginas

- **Home** — panorama habitacional, mapa interativo dos bairros, simulador de aluguel saudável e dados oficiais do IBGE (ao vivo).
- **Sobre o Projeto** — objetivos e pilares do plano.
- **Serviços** — soluções construtivas acessíveis e comparador interativo.
- **Planejamento** — cronograma de execução e metas por prazo.
- **Guia do Cidadão** — FAQ sobre direitos do inquilino e links úteis oficiais.

## Tecnologias

Site 100% estático (HTML, CSS e JavaScript puro, sem build e sem backend):

- Mapa dos bairros com [Leaflet](https://leafletjs.com/) + dados abertos do OpenStreetMap
- Dados populacionais ao vivo via [API pública do IBGE](https://servicodados.ibge.gov.br/)
- Acessibilidade em Libras via [VLibras](https://vlibras.gov.br/)
- Formulário de pesquisa via Google Forms

## Rodando localmente

Não precisa de instalação — é só servir a pasta com qualquer servidor estático, por exemplo:

```bash
python -m http.server 8000
```

E acessar `http://localhost:8000/index.html`.
