"""Publish the standalone Lecture 6 quiz with stable exam/bank entry points."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
source = root.parent / 'philosopher-output/lecture6-mock-quiz.html'
html = source.read_text()
html = html.replace('href="neural-network-pruning.html"', 'href="../artifacts/neural-network-pruning.html"')
html = html.replace('<a class="wordmark" href="../artifacts/neural-network-pruning.html">', '<a class="wordmark" href="../#/">')
html = html.replace('<title>Lecture 6 · Pruning practice</title>', '<title>Lecture 6 mock exam — Margin</title>')
# Keep the setup in reach on phones, rather than placing it below the library hero.
html = html.replace('</style>', '''.sheet>header{padding:32px 0;grid-template-columns:1fr}.sheet>header .practice-plate{display:none}.sheet>header h1{font-size:clamp(36px,5vw,54px);margin:16px 0}.sheet>header .stats{margin-top:16px}.sheet>nav.tabs{margin-bottom:24px}.setup input,.setup select,.toolbar input,.toolbar select,.numeric-fields input,.draft{font-size:16px}
</style>''', 1)
html = html.replace('Pruning, under<br>examination.', 'Put your understanding<br>to work.')
html = html.replace('A little space to <span class="fancy-highlight">practice the ideas behind Lecture 6</span>.', 'Start with a <span class="fancy-highlight">Lecture 6 mock exam</span>, then revisit the ideas that need another look.')
html = html.replace('A smaller paper, drawn from the bank', 'Try a mock exam.')
html = html.replace('Five multiple-choice or true/false questions, followed by a mix of calculations and written explanations. Answers stay hidden until you submit. Your drafts stay in this browser.', 'Five multiple-choice or true/false questions, then seven to ten calculations and explanations. Work at your own pace; submit to see the worked answers.')
html = html.replace('function switchView(v){view=v;', "function switchView(v){history.replaceState(null,'','#'+v);view=v;")
html = html.replace("renderBank();renderCoverage();renderExam();", "renderBank();renderCoverage();renderExam();switchView(['bank','coverage'].includes(location.hash.slice(1))?location.hash.slice(1):'exam');")
html = html.replace('<button data-view="bank" aria-pressed="true">Question bank</button><button data-view="exam" aria-pressed="false">Mock exam</button>', '<button data-view="exam" aria-pressed="false">Mock exam</button><button data-view="bank" aria-pressed="true">Question bank</button>')
html = html.replace('</style>', '@media(max-width:720px){.sheet>header{padding:24px 0}.sheet>header .stats{display:none}.sheet>header h1{font-size:36px}.sheet>header p{font-size:14px;line-height:1.7}}\n</style>',1)
html = html.replace('Skip to the question bank','Skip to practice')
html = html.replace("window.addEventListener('pagehide'", "window.addEventListener('hashchange',()=>switchView(['bank','coverage'].includes(location.hash.slice(1))?location.hash.slice(1):'exam'));window.addEventListener('pagehide'")
destination = root/'public/practice/lecture6.html'
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text('\n'.join(line.rstrip() for line in html.splitlines()) + '\n')
print('Published Lecture 6 quiz source with exam as the default and #bank as a direct entry.')
