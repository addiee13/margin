"""Refresh the library from its neighboring Philosopher output (Python standard library)."""
from pathlib import Path
from html.parser import HTMLParser
import json, re, shutil, math

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / 'philosopher-output'
ORDER = [
 ('lecture2-efficient-ai.html', 'Why AI has to get lighter', 'The big picture', 'Overview', 'Lecture 02', 'Start with the question: how do we make powerful models fit the world we live in?'),
 ('neural-network-building-blocks.html', 'Inside a neural network', 'The foundations', 'Interactive', 'Lectures 02–03', 'Build an intuition for layers, channels, and the tensors that hold it all together.'),
 ('lecture3-efficient-ai-deep.html', 'What makes a network expensive?', 'The deeper look', 'Deep dive', 'Lecture 03', 'Count parameters, activations, and the real cost of moving from a model to a device.'),
 ('neural-network-pruning.html', 'The art of cutting a model', 'The practical part', 'Interactive', 'Lectures 04–06', 'Explore what to cut, what to keep, and how a smaller network finds its footing again.'),
]
class Text(HTMLParser):
 def __init__(self): super().__init__(); self.parts=[]; self.skip=0
 def handle_starttag(self, tag, attrs):
  if tag in ['script','style']: self.skip+=1
 def handle_endtag(self, tag):
  if tag in ['script','style']: self.skip-=1
 def handle_data(self,data):
  if not self.skip:self.parts.append(data.strip())
def plain(value):
 p=Text();p.feed(value);return ' '.join(filter(None,p.parts))
items=[]
for index,(file,title,kicker,kind,lecture,description) in enumerate(ORDER):
 src=SOURCE/file; html=src.read_text()
 full=plain(html)
 sections=[]
 for number,m in enumerate(re.finditer(r'<h2([^>]*)>(.*?)</h2>',html,re.S),1):
  id_match=re.search(r'id=[\"\']([^\"\']+)',m[1])
  sections.append({'id':id_match[1] if id_match else f'margin-section-{number}','title':plain(m[2])})
 items.append({'id':file.removesuffix('.html'),'file':file,'title':title,'originalTitle':plain(re.search(r'<h1[^>]*>(.*?)</h1>',html,re.S)[1]),'kicker':kicker,'kind':kind,'lecture':lecture,'description':description,'minutes':math.ceil(len(full.split())/200),'order':index+1,'sections':sections,'searchText':full})
 (ROOT/'public/artifacts').mkdir(parents=True,exist_ok=True)
 shutil.copy2(src,ROOT/'public/artifacts'/file)
for n in [2,3,4,5,6]:shutil.copy2(ROOT.parent/f'Lecture{n}.pdf',ROOT/'public'/f'Lecture{n}.pdf')
(ROOT/'src/data').mkdir(parents=True,exist_ok=True)
(ROOT/'src/data/artifacts.json').write_text(json.dumps(items,indent=2,ensure_ascii=False)+'\n')
print(f'Imported {len(items)} original artifacts and 5 source slide decks.')
