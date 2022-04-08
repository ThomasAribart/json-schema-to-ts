# Will `json-schema-to-ts` impact the performances of my IDE/compiler?

Long story short: no.

In your IDE, as long as you don't define all your schemas in the same file (which you shouldn't do anyway), file opening and type infering is still fast enough for you not to hardly notice anything, even on large schemas (200+ lines).

The same holds true for compilation. As far as I know (please, feel free to open an issue if you find otherwise), `json-schema-to-ts` has little to no impact on the TS compilation time.
