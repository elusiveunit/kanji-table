# Kanji table

A sortable and filterable table of Japanese kanji.

## Subset font

Uses `pyftsubset` from [fonttools](https://github.com/fonttools/fonttools) to create a subset version of [Source Han Serif](https://source.typekit.com/source-han-serif/) ([GitHub](https://github.com/adobe-fonts/source-han-serif)) that only has the kanji used on the page.

    # brotli for woff2
    pip install fonttools brotli

    # If the brotli installation runs into problems on Windows, e.g. due to
    # Visual C++ build tools, a precompiled version can be installed from
    # https://www.lfd.uci.edu/~gohlke/pythonlibs/#brotli
    pip install ./Brotli‑1.0.7‑cp37‑cp37m‑win_amd64.whl

Build fonts with `npm run subset-font`.

## Sources and credits

- [Kanji usage frequency data by scriptin](https://github.com/scriptin/kanji-frequency)
- [Kanji frequency list ver. 1.3 by the Japanese Agency for Cultural Affairs](http://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/kanji_kako/24/pdf/sanko_3.pdf), extracted with [Tabula](https://github.com/tabulapdf/tabula).
- [The Kodansha Kanji Learner's Course Memrise course](https://www.memrise.com/course/196282/the-kodansha-kanji-learners-course/) for order, with a few double checked against the book.
- ["All 2200 Kanji from Heisig's Remembering the Kanji 6th edition" Reddit post](https://www.reddit.com/r/LearnJapanese/comments/1a126a/all_2200_kanji_from_heisigs_remembering_the_kanji/) for order. Not double checked since I don't own the book.
