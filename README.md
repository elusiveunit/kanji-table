# Kanji table

A sortable and filterable table covering the Japanese kanji contained in _The Kodansha Kanji Learner's Course_ and _Remembering the Kanji (Book 1), 6th edition_.

## Subset font

Uses `pyftsubset` from [fonttools](https://github.com/fonttools/fonttools) to create a subset version of [Source Han Serif](https://source.typekit.com/source-han-serif/) ([GitHub](https://github.com/adobe-fonts/source-han-serif)) that only has the kanji used on the page.

    # brotli for woff2
    pip install fonttools brotli

    # If the brotli installation runs into problems on Windows, e.g. due to
    # Visual C++ build tools, a precompiled version can be installed from
    # https://www.lfd.uci.edu/~gohlke/pythonlibs/#brotli
    pip install ./Brotli‑1.0.7‑cp37‑cp37m‑win_amd64.whl

Build the font with `npm run subset-font`.

## Sources and credits

- [The Kodansha Kanji Learner's Course Memrise course](https://www.memrise.com/course/196282/the-kodansha-kanji-learners-course/) for order, with a few double checked against the book.
- [“All 2200 Kanji from Heisig's Remembering the Kanji 6th edition” Reddit post](https://www.reddit.com/r/LearnJapanese/comments/1a126a/all_2200_kanji_from_heisigs_remembering_the_kanji/) for order, with a few double checked against entries on [Jisho](https://jisho.org).
- [JLPT Kanji from Jonathan Waller's JLPT Resources](http://www.tanos.co.uk/jlpt/skills/kanji/) for JLPT level. Since there is no official JLPT kanji list, this is more of an estimation.
- [List of jōyō kanji Wikipedia page](https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji) for Japanese school grade: “The ‘Grade’ column specifies the grade in which the kanji is taught in Elementary schools in Japan. Grade ’S’ means that it is taught in secondary school.” (Other useful Wikipedia pages are [Kyōiku kanji](https://en.wikipedia.org/wiki/Ky%C5%8Diku_kanji) and [Jinmeiyō kanji](https://en.wikipedia.org/wiki/Jinmeiy%C5%8D_kanji).)
- [List of kanji by stroke count Wikipedia page](https://en.wikipedia.org/wiki/List_of_kanji_by_stroke_count) for stroke count, with the count for kanji not on that page complemented from [KANJIDIC](http://www.edrdg.org/wiki/index.php/KANJIDIC_Project) via [Yomichan](https://foosoft.net/projects/yomichan/).
- [Kanji frequency list ver. 1.3 by the Japanese Agency for Cultural Affairs (PDF)](http://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/kanji_kako/24/pdf/sanko_3.pdf), extracted with [Tabula](https://github.com/tabulapdf/tabula).
- [Kanji usage frequency data by scriptin](https://github.com/scriptin/kanji-frequency).
