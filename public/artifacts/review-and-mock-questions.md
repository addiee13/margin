# Lecture 6 pruning review, important questions, and mock questions

Prepared from the supplied `Lecture6.pdf` (56 PDF pages), checked against its rendered slides. In this packet, “slide N” means PDF page N. The last slide is a **pruning recap**, not a separate instructor exam or numerical problem set. The closing review sequence is slides **50–56**. Course: Dr. Haoxin Wang, GSU; the lecture acknowledges selected materials from Prof. Song Han's MIT course on TinyML and Efficient Deep Learning Computing.

The exact slide material appears first. Everything in the question banks and answer key afterward is **authored study practice**, including questions consolidated from the four existing generated HTML pages. They are not predicted exam questions. Constructed numbers are labeled and are not benchmark measurements.

## 1. Complete final review slide: Lecture6.pdf, slide 56

The wording below is transcribed from the rendered slide, with line wraps normalized.

**Neural Network Pruning**

- **Introduction to Pruning**
  - What is pruning?
  - How should we formulate pruning?
- **Determine the Pruning Granularity**
  - In what pattern should we prune the neural network?
- **Determine the Pruning Criterion**
  - What synapses/neurons should we prune?
- **Determine the Pruning Ratio**
  - What should target sparsity be for each layer?
- **Fine-tune/Train Pruned Neural Network**
  - How should we improve performance of pruned models?

**All mathematical and diagram content:** a dense network appears on the left; a right-facing arrow labeled “Pruning” leads to a network with fewer connections and neurons on the right. The right-hand network receives input **x**. Its output points to:

`arg min over W_P of L(x; W_P), subject to ||W_P||_0 ≤ N`

The figure compares a dense architecture with a sparse architecture. It does not prescribe a particular pruning algorithm or provide a numeric sparsity percentage.

**Slide footer credit:** “Learning Both Weights and Connections for Efficient Neural Network [Han et al., NeurIPS 2015]”. This is the slide's wording; the published paper title uses “Networks”.

Source: [Lecture6.pdf, page 56](../Lecture6.pdf#page=56); rendered evidence [slide 56](../cache/lecture6/slides/slide-56.png).

## 2. All supporting closing-slide content: slides 50–55

### Slide 50: Neural Network Pruning

The same complete five-part outline and sparse-network objective as slide 56 appear. Introduction, granularity, criterion, and ratio are greyed; fine-tuning is emphasized. Its emphasized questions are “Fine-tune/Train Pruned Neural Network” and “How should we improve performance of pruned models?” The input **x**, dense-to-pruned diagram, “Pruning” arrow, `arg min L(x; W_P)` and `||W_P||_0 ≤ N` constraint remain visible, with the same Han et al. footer. [Source](../Lecture6.pdf#page=50)

### Slide 51: Fine-tuning / Training

“How should we improve performance of sparse models?” [Source](../Lecture6.pdf#page=51)

### Slide 52: Finetuning Pruned Neural Networks

Exact bullet wording, preserving an apparent omission in the first bullet:

- “After pruning, the model may decrease, especially for larger pruning ratio.”
- “Fine-tuning the pruned neural networks will help recover the accuracy and push the pruning ratio higher.”
- “Learning rate for fine-tuning is usually 1/100 or 1/10 of the original learning rate.”

Interpretation of the first bullet: the surrounding graph and next bullet indicate that **accuracy** may decrease; “accuracy” is absent from the printed first bullet.

The process diagram is **Train Connectivity → Prune Connections → Train Weights**. The graph compares **Pruning** against **Pruning+Finetuning**. Its x-axis is **Pruning Ratio (Parameters Pruned Away)**, shown from 40% to 100%; the y-axis is **Accuracy Loss**, shown from +0.5% to −4.5%. The fine-tuned curve preserves accuracy to higher pruning ratios than the pruning-only curve. No exact coordinate table is supplied, so plotted points should not be treated as precise benchmark data. Footer credits Han et al., NeurIPS 2015. [Source](../Lecture6.pdf#page=52)

### Slide 53: Iterative Pruning

- “Consider pruning followed by a fine-tuning is one iteration.”
- “Iterative pruning gradually increases the target sparsity in each iteration.”

The process is **Train Connectivity → Prune Connections → Train Weights**, with a return arrow from Train Weights to Prune Connections. The pruned step is labeled **50% pruned**. The same two accuracy curves, axis labels, ranges, and Han et al. credit as slide 52 appear. [Source](../Lecture6.pdf#page=53)

### Slide 54: Iterative Pruning

The same two bullets, feedback loop, graph legend and axes as slide 53 appear. The pruning-step label changes to **70% pruned**, illustrating increased **total target sparsity**, not an instruction to remove another 70% of surviving weights. The footer again credits Han et al., NeurIPS 2015. [Source](../Lecture6.pdf#page=54)

### Slide 55: Iterative Pruning

The same two iterative-pruning bullets appear, plus:

- “boost pruning ratio from 5X to 9X on AlexNet compared to single-step aggressive pruning.”

The diagram keeps the feedback loop. The graph adds a third legend entry, **Iterative Pruning and Finetuning**, alongside Pruning and Pruning+Finetuning. The new curve preserves accuracy at higher sparsity than the one-step curves in this example. Axis names/ranges and Han et al. credit remain. The **5X/9X** statement is a model-specific compression-factor example, not a universal speedup or accuracy guarantee. [Source](../Lecture6.pdf#page=55)

## 3. Coverage audit and study route

All four pre-existing HTML files were read in full for substantive coverage. They already explain every headline review concept. The remaining gaps were **depth, worked calculations, prerequisites, and a consolidated question bank**, rather than wholesale missing topics. Existing files are preserved.

| Review requirement / prerequisite | Existing substantive coverage | Gap filled in new material |
|---|---|---|
| What pruning removes; weights versus activations | [Building blocks](neural-network-building-blocks.html), sections 2–4; [Pruning](neural-network-pruning.html), section 1 | Correct inclusive nonzero budget and fixed-mask versus rebuilt-model distinction |
| Formulate constrained loss minimization | Pruning section 1 | [Loss and reconstruction](pruning-loss-and-reconstruction.html): loss, L0 count, derivatives and correct loss-change sign |
| Granularity: unstructured, pattern, vector, kernel, channel | Pruning section 2 and interactive matrix lab | [Budgets and efficiency](pruning-budgets-and-efficiency.html): metadata bits and explicit shape/MAC/memory savings |
| Weight magnitude, group L1/L2 norms, scaling factors | Pruning section 3 and interactive magnitude lab | Loss and reconstruction: full norm examples, comparable-input-scale caveat, gamma solved case |
| Second-order/OBD criterion | Pruning section 3 | Loss and reconstruction: gradient/Hessian prerequisites, numeric saliencies, assumptions and nonstationarity/cross-term caveats |
| APoZ neuron criterion | Pruning section 4 and interactive APoZ lab | Loss and reconstruction plus M10: independent solved zero counts and calibration-data limitation |
| Regression/layer reconstruction | Pruning section 4 | Loss and reconstruction plus M11: numeric selection, least-squares refit and Frobenius error |
| Layer-wise target sparsity and sensitivity | Pruning section 5 | Budgets and efficiency: weighted global sparsity, exact threshold example and combined-layer caveat |
| AMC / NetAdapt | Pruning section 5 | Budgets and efficiency: feasible/infeasible reward and candidate-selection examples |
| Fine-tuning and iterative pruning | Pruning section 6 | Budgets and efficiency: survivor-fraction derivation, learning-rate arithmetic and accuracy-versus-speed distinctions |
| Channels, tensor shapes, parameters, grouped/depthwise blocks | Building blocks sections 3–6 | M14–M17: written calculations rather than relying on interactive calculators |
| MACs/FLOPs, model storage, latency bottlenecks | Building blocks section 7; [Lecture3 study page](lecture3-efficient-ai-deep.html) | Budgets and efficiency: grouped/depthwise MAC derivation, bytes including sparse metadata, latency bounds |
| Efficiency motivation, quantization/hardware distinction | [Lecture2 study page](lecture2-efficient-ai.html) | Already sufficient background; no duplicate overview was created |

**Corrections to carry into studying:**

1. Final slide 56 uses `≤ N`, meaning **at most N nonzeros**. The existing pruning HTML prints `< N` in several places. Lecture5 slide 5 itself inconsistently uses `<` in one formula and `≤` in its diagram. Use the final-review inclusive constraint here.
2. A positive **loss increase** is `L(pruned) − L(original)`. The old page and Lecture6 slide 13 write the subtraction in the reverse order while displaying a positive second-order expression. The new mathematics supplement explicitly repairs the sign convention.
3. A small weight is not always unimportant: the input activation scale, downstream effect, and curvature matter. The old `0.1` example needs comparable input scales.
4. Lecture6 slide 7 defines N:M using **N pruned positions**. Some literature and the new resource supplement use **N retained positions**; state the convention. For 2:4, either gives 50%, so the ambiguity is hidden.
5. Six 2:4 position patterns require **3 bits per group** for an ideal fixed-length group identifier. Two retained values each using a **2-bit position index** require **4 bits per group**. These are different encodings.
6. Channel pruning makes a smaller dense network when channels are physically rebuilt. Merely zeroing channels does not ensure saved dense computation, storage, or measured latency. “Direct speedup” is a deployment opportunity, not a guaranteed proportional wall-clock result.

Suggested route: read the final outline → refresh channels in Building Blocks → study Loss and Reconstruction → study Budgets and Efficiency → attempt questions without the key → inspect source slides for anything unclear.

## 4. Important conceptual questions — authored, with answer expectations

These consolidate the 15 existing generated practice prompts (7 from Building Blocks, 8 from Pruning) and add the uncovered connections. They are reformulated for clarity; none is a slide-provided exam question. Numerical versions are in the mock bank below.

| ID | Question | A complete answer should include |
|---|---|---|
| I1 | What is pruning, and what is the difference between pruning a synapse and a neuron? | Delete a weight/connection versus a feature unit/channel; parameters versus activations; downstream dimensional effects |
| I2 | Write the pruning objective and define every symbol. What does `≤ N` allow? | Loss minimization; input x; pruned weights W_P; L0 counts nonzeros; N maximum allowed; equality feasible |
| I3 | Why is the “L0 norm” not a true norm? | It counts nonzero entries and fails norm homogeneity: scaling a nonzero vector does not scale the count |
| I4 | Contrast fine-grained, N:M, kernel and channel pruning. | Removed unit, flexibility, sparse metadata, hardware support, shape reduction and tradeoffs |
| I5 | Why might fine-grained pruning reduce parameters without speeding a dense implementation? | Tensor shape unchanged; dense kernel processes zero entries; sparse representation/kernel needed |
| I6 | Explain 2:4 sparsity and distinguish 2-bit position indices from pattern bits. | Two surviving positions out of four; six patterns; 2 bits per surviving position versus 3 group bits |
| I7 | How do element-wise magnitude and row-wise L1/L2 pruning select different candidates? | Absolute scalar weights versus grouped score; summed magnitudes versus square root of summed squares |
| I8 | When can magnitude fail as an importance heuristic? | Input scales, rescaling symmetries, layer sizes, curvature and interactions; same scale assumptions matter |
| I9 | What are scaling factors gamma, and why can a small gamma suggest pruning? | Learned per-channel multiplier; use magnitude; represent contribution after scaling; not proof of harmlessness |
| I10 | Derive the OBD saliency and state all three assumptions. | Taylor expansion; stationary gradient; near-quadratic loss; diagonal Hessian approximation; 0.5 h_ii w_i² |
| I11 | What sign convention makes ΔL an increase? | ΔL=L(W+δW)−L(W); deleting weight i uses δw_i=−w_i |
| I12 | Explain APoZ, its denominator, and its limitations. | Zero count over channel activations on calibration samples; higher APoZ candidate; representative data and dead-ReLU caveat |
| I13 | What does regression-based channel pruning optimize? | Local output reconstruction, beta selectors, Frobenius squared error; select then refit; differs from final task loss |
| I14 | Why do layers need different ratios? What does sensitivity analysis miss? | Unequal redundancy/sensitivity/resource contribution; isolated pruning ignores interactions |
| I15 | State AMC's state, action, agent and reward. | Layer features/resource history; continuous ratio; DDPG; negative error under constraints, −∞ otherwise in lecture illustration |
| I16 | Describe a complete NetAdapt iteration. | Resource reduction ΔR; per-layer candidates; short fine-tune; feasible candidate with best accuracy; repeat; long fine-tune |
| I17 | Why does fine-tuning help, and why use a smaller learning rate? | Surviving weights compensate; already trained starting point; stabilize adjustment; preserve sparsity; no guarantee |
| I18 | Distinguish target total sparsity from pruning a fraction of survivors. | Original versus current denominator; multiplicative retention across rounds |
| I19 | Why do fewer parameters not necessarily mean lower peak memory or latency? | Activations, live buffers, bandwidth, sparse indices, unaffected operations, hardware and runtime |
| I20 | Distinguish MAC, FLOP, FLOPS, latency and throughput. | Operation counts, arithmetic convention, per-second rate, single-task delay and tasks per second |
| I21 | What makes one convolutional output channel, and which next-layer weights disappear when it is pruned? | One multi-input-channel filter creates one map; matching input slice in all next-layer filters |
| I22 | Do pooling, ReLU and BatchNorm add learned parameters? | Pooling/ReLU none; BatchNorm typically gamma and beta per channel; running statistics are state rather than learned parameters |
| I23 | Why should accuracy be evaluated after combined pruning and fine-tuning? | Local decisions interact; recovery changes weights; use held-out validation and reserve final test set |
| I24 | How do quantization and pruning differ? | Fewer bits per value versus fewer retained values; can combine, but format/hardware/accuracy costs still matter |

## 5. Mock question bank — authored numerical and applied practice

Every problem below is constructed, except where a value is explicitly credited to a course slide. Work independently before opening section 6. All convolution counts ignore biases unless requested; one MAC = two FLOPs; MB = 1,000,000 bytes and MiB = 1,048,576 bytes.

### Formulation and criteria

**M1. Nonzero budget.** A tensor has 100 entries and `||W_P||_0 ≤ 30`. Is keeping exactly 30 feasible? What minimum sparsity follows? Does the constraint force exactly 30?

**M2. Sparse neuron prediction.** Let `y=ReLU(10x0−8x1+0.1x2)`. For `x=(1,1,1)`, compute the original output and output after deleting each of the three weights. Which deletion changes the output least? Repeat the deletion comparison for `x=(0.01,0.01,100)` and explain the assumption hidden in magnitude pruning.

**M3. Element-wise and grouped pruning.** For `W=[[4,−1],[−2,3]]`, prune 50% by (a) element-wise magnitude and (b) row-wise L2 magnitude. Compute row L1 too. Give retained matrices.

**M4. L1 versus L2 disagreement.** Two equal-length rows are `[3,3]` and `[5,0]`. If you must remove one row, which does L1 remove and which does L2 remove? Why can they disagree?

**M5. Scaling criterion.** Four output channels have learned `gamma=[−0.10,0.29,1.17,0.82]`. Remove two by absolute gamma. Why would sorting signed values be a mistake? What remains to validate?

**M6. OBD ranking.** At a stationary point with diagonal Hessian, `w=[0.2,1.0]` and `diag(H)=[100,1]`. Compute deletion saliencies. Which weight does magnitude prune, and which does OBD prune?

**M7. Nonstationary Taylor term.** For one weight `w=0.5`, gradient `g=0.4` and Hessian `h=2`, compute the second-order Taylor estimate of `L(pruned)−L(original)`. Compare with the stationary OBD estimate. A negative loss change means what?

**M8. Interaction term.** Let `w=[1,1]`, `g=0`, and `H=[[1,0.8],[0.8,1]]`. Compare deleting each weight individually with deleting both. Why can summed diagonal saliencies underestimate joint damage?

**M9. Curvature intuition.** Two weights have equal magnitude 0.5 but Hessian diagonals 2 and 20. Calculate their OBD saliencies and identify the more sensitive direction.

**M10. APoZ.** Across two samples, each channel has a 2×2 activation map. Channel A values are `[0,0,1,0]` and `[0,2,0,0]`; B values are `[0,1,2,3]` and `[0,0,4,5]`; C values are `[0,0,0,0]` and `[0,0,0,1]`. Compute each APoZ and choose one candidate. Is that enough to guarantee safety?

**M11. Reconstruction and refit.** A two-channel linear layer has input columns `x1=[1,2]`, `x2=[2,4]` and weights `[1,1]`, so its target outputs are `Z=x1+x2`. Retain only x1. Compute squared reconstruction error before refitting. Find the least-squares retained weight `a=(x1^T Z)/(x1^T x1)` and final error. What beta vector selects x1?

### Budgets, building blocks and hardware

**M12. Weighted sparsity.** Layer A has 100 weights and is pruned 10%; B has 900 and is pruned 80%. Calculate global sparsity, remaining weights and parameter compression. Explain why averaging the percentages is wrong.

**M13. Weight bytes and sparse indices.** A model has 1,000 FP32 weights. Prune 80%. Calculate dense bytes, values-only sparse bytes, and sparse bytes if each surviving value needs a 32-bit flat index. Compare both compression factors.

**M14. Convolution shape and counts.** Input shape is `(1,3,32,32)`. A convolution uses 16 filters, 5×5 kernels, stride 1, padding 0. Find weight shape, output shape, parameters with/without bias, activations, MACs and FLOPs.

**M15. Grouped and depthwise.** A layer has 32 input channels, 64 output channels, 3×3 kernels and 8×8 output maps. Find dense and g=4 grouped weights/MACs. For a separate depthwise layer with 32 inputs and outputs, same spatial/kernel sizes, find weights/MACs. Explain the group divisibility condition.

**M16. Coupled channel savings.** Layers A: `8→16` and B: `16→32`, both 3×3, output 10×10, stride 1/padding 1. Rebuild after removing four A output channels. Count combined parameters/MACs before and after and the saved FP32 middle activations. What if you only zero the original tensors?

**M17. Supporting blocks.** Apply 2×2 max pooling and average pooling, stride 2, to `[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]`. Compute outputs. Apply ReLU to `[-2,0,3]`. How many learned parameters are added by each operation? How many by BatchNorm with 16 channels and affine scale/shift?

**M18. 2:4 metadata.** Sixteen FP16 values become 2:4 sparse. Count dense bits, retained-value bits, and position bits when each survivor needs a 2-bit index. Find storage compression. How many bits would an ideal fixed-length group pattern identifier need, and why is that a different format?

**M19. Quantization versus sparsity.** A 25-million-parameter dense model uses FP32. Compute MB and MiB. Compute ideal int8 value storage, then ideal values-only storage with both int8 and 80% sparsity. State missing costs.

**M20. Peak activation memory.** A sequential step consumes 150,528 input scalars and produces 290,400 output scalars, as in the AlexNet example in Lecture3 slide 49. Assuming both are live together in FP32 and no other buffers, compute peak bytes/MB/MiB. At batch size 4, how does this term change? Why is this not total runtime RAM?

**M21. Latency versus throughput.** Design 1 handles one image in 50 ms; Design 2 handles a batch of four in 100 ms. Find per-image latency and throughput assuming no queueing, steady repetition and simultaneous batch output.

**M22. Bottleneck bound.** A layer uses 864,000 FLOPs and transfers 1,000,000 bytes. Sustained compute is 100 million FLOPs/s and bandwidth 100 million bytes/s. Find compute time, memory time, and ideal overlapped bound. Halve FLOPs only; recompute. How would no overlap change the original estimate?

**M23. Whole-model acceleration.** A supported sparse kernel makes 60% of baseline latency 2× faster. The rest is unchanged. Compute model speedup. What if all 100% were accelerated?

### Ratio selection and accuracy recovery

**M24. Sensitivity threshold.** Baseline accuracy is 90%. At sparsities `[0,25,50,75]%`, A accuracies are `[90,89.5,88,80]%` and B accuracies `[90,90,89,88.5]%`. Allow a maximum drop of 2 percentage points. Find largest tested ratios and global sparsity for 100 A weights and 900 B weights. Distinguish a relative 2% drop and explain the combined-model check.

**M25. AMC reward.** Budget is 50 ms. Candidate A is 48 ms/12% error; B is 52 ms/8% error. Under the lecture's reward `−Error` when feasible and `−∞` otherwise, give rewards using fractional error. Why is DDPG a plausible agent for this action space?

**M26. NetAdapt iteration.** Current latency is 100 ms; require ΔR=10 ms. After equal short fine-tuning, candidates are A:88 ms/89% accuracy, B:90 ms/90%, C:94 ms/91%. Identify feasibility and winner. Do you add the savings of all three candidates? Explain the next step.

**M27. Iterative sparsity.** Start with 1,000 weights. Prune 50%, fine-tune, then target 70% total sparsity. How many remain at each step, and what fraction of survivors is pruned at the second step? What if you instead remove 70% of survivors? Compute sparsity after three rounds removing 20% of survivors each round.

**M28. Fine-tuning and evaluation.** Original learning rate is 0.01. Calculate the two lower-rate examples in Lecture6 slide 52. Baseline validation accuracy is 90%, after pruning 86%, after fine-tuning 89%. Find drops in percentage points and accuracy recovered. What should be enforced for a fixed-mask optimizer update, and why reserve a test set?

## 6. Worked answer key

### M1

Exactly 30 is feasible because the inequality is inclusive. Minimum sparsity is `(100−30)/100=70%`. It allows any smaller nonzero count too; zero weights may all be removed in the constraint even if that produces poor loss. Feasible does not mean optimal.

### M2

For `(1,1,1)`, preactivation is `10−8+0.1=2.1`; ReLU gives 2.1. Delete 10: ReLU(−7.9)=0, change 2.1. Delete −8: ReLU(10.1)=10.1, change 8.0. Delete 0.1: ReLU(2)=2, change 0.1. The smallest magnitude is least harmful **for this input**.

For `(0.01,0.01,100)`, original preactivation is `0.1−0.08+10=10.02`. Delete 10-weight: output 9.92, change 0.10. Delete −8-weight: output 10.10, change 0.08. Delete 0.1-weight: output 0.02, change 10.00. Now the smallest weight causes the largest change because its input is huge. Raw magnitude needs activation-scale/context assumptions; this is a single-input illustration, not a full loss estimate.

### M3

Absolute values are `[[4,1],[2,3]]`. Keep the largest two scalars: `[[4,0],[0,3]]`.

Row L2 values are `sqrt(4²+1²)=sqrt17≈4.123` and `sqrt(2²+3²)=sqrt13≈3.606`. Remove the second row: `[[4,−1],[0,0]]`. Row L1 scores are 5 and 5, so they tie and require a declared tie-break. Element-wise and row-wise candidates obey different granularities even at the same 50% weight budget.

### M4

L1 scores are 6 and 5: remove `[5,0]`. L2 scores are `sqrt18≈4.243` and 5: remove `[3,3]`. L2 emphasizes concentrated large values more strongly; neither ranking by itself proves lower task-loss damage.

### M5

Absolute gamma scores are `[0.10,0.29,1.17,0.82]`; remove channels 0 and 1. A large negative gamma is a large sign-reversing contribution, not a small contribution, so sorting signed values is generally wrong. Rebuild/coordinate downstream channels, fine-tune, and validate accuracy on representative data. Small scale is a heuristic, not a guarantee.

### M6

`S0=0.5·100·0.2²=2`; `S1=0.5·1·1²=0.5`. Magnitude removes weight 0 because 0.2<1. OBD removes weight 1 because 0.5<2. The smaller weight lies in a steeper loss direction. This conclusion assumes the stationary, local quadratic, diagonal approximation is meaningful for the deletion.

### M7

Deletion perturbation `δw=−0.5`. Taylor increase is `gδw+0.5hδw²=0.4(−0.5)+0.5·2·0.25=−0.20+0.25=0.05`. Stationary OBD omits the gradient and predicts 0.25. Negative ΔL would mean pruning improves the modeled local loss, rather than damages it; do not force every nonstationary loss change to be positive.

### M8

Each isolated deletion gives `0.5·1·1²=0.5`. Deleting both uses `δ=[−1,−1]`, so `0.5 δ^T H δ=0.5(1+0.8+0.8+1)=1.8`. Sum of diagonal-only scores is 1.0, missing 0.8 of interaction. The off-diagonal Hessian describes coupled effects; independent saliencies need not add correctly for simultaneous deletions.

### M9

`0.5·2·0.5²=0.25`; `0.5·20·0.5²=2.5`. The second direction is ten times more sensitive in this approximation despite equal magnitudes. Curvature measures how rapidly the loss bends with parameter change.

### M10

There are `2·2·2=8` activation values per channel. A has `3+3=6` zeros, APoZ=6/8=75%. B has `1+2=3`, APoZ=37.5%. C has `4+3=7`, APoZ=87.5%. C is the highest-APoZ candidate. Validate with representative inputs and downstream accuracy; a rare nonzero activation could be important, and an apparently dead ReLU may become active on another input distribution. APoZ zero counts differ from weight sparsity counts.

### M11

Target `Z=[3,6]`. Selecting x1 means `beta=[1,0]`. Before refit, original retained weight 1 predicts `[1,2]`; residual `[2,4]` gives squared Frobenius error `2²+4²=20`. Refit gives `a=(1·3+2·6)/(1²+2²)=15/5=3`. Prediction `[3,6]` matches Z exactly; error 0. This toy's perfectly correlated channels permit exact replacement. It does not imply arbitrary channels are interchangeable or local zero error guarantees end-to-end accuracy.

### M12

Removed `100·0.1+900·0.8=10+720=730`. Retained `1,000−730=270`; sparsity 73%; compression `1,000/270≈3.704×`. The unweighted mean 45% is wrong because it gives equal influence to differently sized layers.

### M13

Dense FP32: `1,000·4=4,000 bytes`. Retained 200 values: `200·4=800 bytes`, ideal value compression 5×. With indices: `800+200·4=1,600 bytes`, compression 2.5×. Headers/alignment can add more; zero values in an unchanged dense tensor still use 4,000 bytes.

### M14

`W=(16,3,5,5)`. Output height and width `(32−5)/1+1=28`; `Y=(1,16,28,28)`. Weights `16·3·25=1,200`; with 16 biases, 1,216 parameters. Activations `16·28·28=12,544`. MACs `12,544·3·25=940,800`; FLOPs `1,881,600`. The count excludes bias additions and following operations.

### M15

Dense weights `64·32·9=18,432`; MACs `18,432·64=1,179,648`. Grouped g=4 weights `18,432/4=4,608`; MACs `294,912`. Both input/output channel counts must be divisible by g under equal-sized grouping. Depthwise, multiplier 1: 32 independent 3×3 filters, weights `32·9=288`; MACs `288·64=18,432`. It does not mix channels; a separate pointwise layer often handles mixing.

### M16

Before: A weights `16·8·9=1,152`; B `32·16·9=4,608`; total 5,760. After: A `12·8·9=864`; B `32·12·9=3,456`; total 4,320. Both outputs have 100 spatial positions, so MACs are 576,000→432,000. Savings are 25%. Middle activations `1,600→1,200` values; save 400 FP32 values =1,600 bytes. Zeroing the original dense tensors alone leaves shapes and dense loop counts unchanged. B's output stays at 32 channels.

### M17

Max pooling outputs `[[6,8],[14,16]]`. Average pooling outputs `[[3.5,5.5],[11.5,13.5]]`. ReLU outputs `[0,0,3]`. Pooling and ReLU add no learned parameters. BatchNorm affine gamma and beta add `2·16=32` learned scalars; running means/variances are additional stored state, not gradient-trained affine parameters. A channel's pooling is independent of other channels.

### M18

Dense 256 bits (32 bytes). Eight retained FP16 values use 128 bits; eight 2-bit indices add 16 bits. Total 144 bits (18 bytes); compression `256/144≈1.778×`. Four groups each have `C(4,2)=6` possible survivor patterns. A group identifier needs `ceil(log2 6)=3` bits, giving an ideal 140-bit total. Per-value indices instead use 4 bits per group; hardware formats and padding determine actual storage. This is storage arithmetic, not a measured speedup.

### M19

FP32 weights `25,000,000·4=100,000,000 bytes=100 MB≈95.367 MiB`. Int8 weights 25,000,000 bytes=25 MB≈23.842 MiB. Keep 20% in int8: 5,000,000 bytes=5 MB≈4.768 MiB, an ideal 20× value reduction relative to dense FP32. Indices, scales/zero points, headers, alignment and activation/working memory are omitted. Quantization can also change accuracy and operator support.

### M20

Live values `150,528+290,400=440,928`. FP32 bytes `440,928·4=1,763,712=1.763712 MB≈1.682 MiB`. Batch 4 gives 7,054,848 bytes≈7.055 MB≈6.728 MiB for this term. Weights, allocator overhead, kernels' workspace, other simultaneously live tensors and training buffers are excluded; this is a simplified sequential peak estimate.

### M21

Design1: latency 50 ms, throughput `1/0.050=20 images/s`. Design2: latency 100 ms per image in the batch, throughput `4/0.100=40 images/s`. Dividing batch time by batch size gives average service time per produced image (25 ms), not the waiting time experienced by each image in a simultaneous batch.

### M22

Compute `864,000/100,000,000=0.00864 s=8.64 ms`. Memory `1,000,000/100,000,000=0.010 s=10 ms`. Ideal overlapped bound=max=10 ms. Halved FLOPs gives 4.32 ms compute and still 10 ms memory/bound. With no overlap, original sum=18.64 ms, before launch/other overhead. Counts divided by peak advertised rates can be optimistic; the question assumes sustained rates.

### M23

New latency fraction `0.60/2+0.40=0.70`. Model speedup `1/0.70≈1.429×`; latency decreases 30%. If all baseline time were accelerated 2×, model speedup would be 2×. Parameter savings are not a substitute for the accelerated-time fraction.

### M24

Threshold=90%−2 percentage points=88%. Largest admissible tested A ratio=50%; B=75%. Proposed global sparsity `(100·0.5+900·0.75)/1,000=725/1,000=72.5%`. A relative 2% drop would require `90%·0.98=88.2%`, so A=25%, B=75% among the listed values. Combined accuracy must be measured; independent curves do not add or guarantee joint feasibility.

### M25

A feasible: reward −0.12. B infeasible: reward −∞ even though −0.08 would be better without the latency constraint. DDPG supports continuous action outputs, matching per-layer ratios. This is the lecture's illustrated hard-constraint formulation, not a requirement for every compression agent.

### M26

Required next latency ≤90 ms. A and B feasible; C infeasible. Choose B because its post-fine-tuning accuracy is higher among feasible candidates. These are separate models built from the same current model, so **do not add** candidate savings. Continue from B, generate the next round, stop when the overall budget is met, and perform long-term fine-tuning.

### M27

First retain 500. Target 70% total sparsity retains 300, so remove 200 of 500 survivors, or 40%. Removing 70% of survivors instead leaves 150, total sparsity 85%. Three 20%-of-survivor rounds retain `1,000·0.8³=512`; remove 488, sparsity 48.8%. With rounding, integer counts may slightly alter a real schedule.

### M28

Rates: `0.01/100=0.0001` and `0.01/10=0.001`. Pruning drops accuracy 4 percentage points; fine-tuning recovers 3 points and leaves a 1-point deficit. Maintain the fixed mask so optimizer updates do not regrow deleted weights accidentally; rebuilt structured models enforce reduced shapes. Tune/select using validation, then evaluate the reserved test set to avoid optimistic selection bias. The recovered accuracy does not establish improved latency; profile separately.

## 7. Direct reference and attribution guide

- [Lecture6.pdf](../Lecture6.pdf): final review slide 56; closing support 50–55; granularity 5–9; magnitude/scaling/OBD 11–13; APoZ 15; regression 16–18; sensitivity 29–34; AMC 37–41; NetAdapt 42–49.
- [Lecture5.pdf](../Lecture5.pdf): formulation and criterion detail; rendered figures support prerequisite explanations in the new mathematics page.
- [Lecture4.pdf](../Lecture4.pdf): latency 5; model size 11; MACs 17–22; FLOPs/FLOPS 24.
- [Lecture3.pdf](../Lecture3.pdf): channels and building blocks; latency/throughput 32–34; activation counts 49.
- Original study pages are generated explanatory material, not instructor-authored notes: [Lecture2](lecture2-efficient-ai.html), [Lecture3](lecture3-efficient-ai-deep.html), [Building Blocks](neural-network-building-blocks.html), [Pruning](neural-network-pruning.html).
- New detailed supplements: [Pruning Loss and Reconstruction](pruning-loss-and-reconstruction.html), [Pruning Budgets and Efficiency](pruning-budgets-and-efficiency.html).

No claim is made that this packet includes a different, unavailable exam-review deck. It covers all final-review content in the supplied last lecture and the numerical foundations needed to answer that pruning outline.
