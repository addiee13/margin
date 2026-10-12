# Midterm worked guide: coverage and mathematical audit

Source: `Mid-term Review.pdf`, 98 PDF pages. The instructor material acknowledges inspiration and selected material from Prof. Song Han's MIT TinyML and Efficient Deep Learning Computing course. Page references below are actual PDF page numbers. Per the user's source clarification, appended pages 83–98 are the Lecture 7 number-format/quantization source.

Deliverable: `philosopher-output/midterm-review-worked-guide.html`. It is one self-contained white Philosopher HTML document with inline CSS, 15 instructional sections, 54 original practice panels with numbered worked steps, table of contents, a concept map and relation table, local PDF citations, and a link to the separate Lecture 7 document. Constructed practice inputs are labeled and are not represented as slide values. The page contains approximately 8,700 words including source notes and practice solutions.

## Actual stars

All 98 rendered pages were inspected. A second independently generated upper-band view resolved four markers missed on earlier cached contact-sheet views. Final **42** star pages:

17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30, 32, 33, 34, 35, 46, 47, 52, 53, 55, 58, 60, 65, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 82, 84, 86, 89, 92, 93, 97.

Yellow pooling blocks, plots, and highlights are not stars. The independent coverage mapping is in `midterm-star-coverage.json`. Repeated starred slides map to the same explanation family rather than receiving duplicated explanations.

## Coverage matrix

| Family / source pages | Guide section | Original explanation and constructed practice |
|---|---|---|
| Exam context, pp. 1–2 | 1 | Source requirements described without predicting exam questions |
| Q1 dense, pp. 3–5; starred 30,32 | 2 | Full source derivation, parameter/batch distinction, depth/width; D1,D2 |
| 1D/2D conv, starred 33,34; pooling starred35 | 3 | Shapes, floor output formula, derivation, C1,C2; G1,G2 grouped/depthwise comparisons; pooling/ReLU explanations |
| Q2 memory, pp. 6–8; starred20,52,53 | 4 | Source explanation, resolution scaling M1,M2; live-buffer bytes M3,M4; conceptual variant |
| Q5 pp.16,23; starred17,18,46,47 | 5 | Exact original three-layer table; separately labeled seven-layer diagram extension; NA,NB full architecture tables |
| MAC/GEMM starred21,22,55,58; FLOP starred60 | 6 | Formula derivation, A1,A2; T1,T2 latency/throughput/energy; S1,S2 storage |
| Motivation/NAS/LLM starred24,25,26,28,29 | 6 | Efficiency-quality tradeoffs, prompting concepts, NAS, three conceptual variants |
| Pruning overview pp.62–64; starred65,68 | 7 | Inclusive nonzero constraint, masks vs rebuilt shapes; P1,P2 linked channel counts, NM1,NM2 source-specific sparsity convention |
| Q3 pp.9–11; starred69,70,72 | 8 | Source magnitude ranking; W1,W2; SCALE1,SCALE2; Z1,Z2 APoZ, limitations and conceptual variant |
| Q4 pp.12–15; starred73–80 | 9 | Source answer, sensitivity process, weighted ratios R1,R2, deterministic threshold table R3; three AMC/NetAdapt/interaction variants |
| Iterative pruning starred82 | 10 | Survivor-based derivation, I1,I2, fine-tuning explainer |
| Integer/fixed point pp.83–85; starred84 | 11 | Source -64 coincidence clarified; INT1,INT2; FX1,FX2 signed/scaled arithmetic |
| IEEE pp.86–95; starred86,89,92,93 | 12 | FP32 source 0.265625 and FP16 source -7; F1–F4 normal variants; SUB1,SUB2; SP1,SP2 classification |
| Range/precision pp.90–97; starred97 | 13 | Four boundary formulas, B1,B2, PRES1,PRES2; explicit toy value sets TINY1,TINY2 |
| Quantization p.98 | 14 | Slide definition; clearly labeled extra uniform-rounding formula, Q1–Q3; companion link |
| Integration/limits | 15 | Typed 11-node concept map, relation table, answer self-review lens and source limitations |

## Source caveats preserved in the guide

1. **Q5 scope:** page 16 presents only Conv16 → Pool → Conv32. Page 23 fully answers that question. Its exact totals are 5,040 weights, 7,340,032 output activations, and 415,236,096 MACs. Pages 18/47 separately show seven layers; their completed counts are explicitly a separate extension.
2. **AlexNet activation convention:** pages 20/52 count the input in their 932,264 total. Outputs alone sum to 781,736. Their 440,928 peak is input+conv1 under a simplified buffer convention, not measured allocator memory.
3. **“Signed” on p84:** means sign-magnitude as introduced on p83. Its -64 answer happens to match two's complement for 11000000 but is not generally equivalent.
4. **Normal finite IEEE values:** exponent must be in 1…254 for FP32; all-ones exponent is special, so “E nonzero” alone is insufficient.
5. **Toy FP4 p97:** displayed encodings/formulas contain inconsistent annotations and use non-IEEE special-value conventions. E2M1's printed expression (1+0.5)×2^(3−1) equals6, not1. Practice uses explicit displayed value sets instead of assuming an IEEE contract.
6. **N:M p67:** source defines N as the count pruned in each M-element group. A constructed non-half example explicitly follows that convention.
7. **Quantization p98:** no affine or uniform rounding formula is provided there. The numerical rounding formula is labeled an explanatory extension; it is not claimed to be an extracted Lecture 7 formula.
8. **Plot values and speedups:** no exact table is invented from curves; all threshold-table inputs are constructed. MAC/storage reductions are distinguished from measured latency or matched-quality improvement.

## Verification

`python3 quiz-work/verify-midterm-numerics.py` passes **70 arithmetic check groups**. The JSON report contains all inputs' recomputed counts/results, exact expected outputs, the original Q5 three-layer totals, the separate seven-layer source diagram, and two complete constructed network tables. The independent agent initially checked all69 pre-Q5-total groups with Fraction arithmetic, native IEEE decoding, and independent window-position counting; the added original-Q5 total follows directly from its independently checked layer rows. See `midterm-independent-check.md` and `verify-midterm-independent.py`.

Additional prose microcalculations and the sensitivity threshold-selection logic were independently reviewed. Final browser QA is recorded by the parent in `study-guide-qa/browser-check.json`; table scroll containers preserve all columns at narrow width, while the body remains readable without horizontal scrolling. Render verification is separate from arithmetic verification.
