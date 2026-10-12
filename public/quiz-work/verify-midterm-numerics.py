"""Direct arithmetic checks for every numerical example in the worked review guide."""
from pathlib import Path
import json,math,struct
checks=[]
def check(name,got,expected):
 assert got==expected,(name,got,expected)
 checks.append({'id':name,'result':got,'expected':expected,'pass':True})
def conv(ci,co,h,k=3,s=1,p=1,g=1):
 o=(h+2*p-k)//s+1
 return {'out':[co,o,o],'weights':co*(ci//g)*k*k,'activations':co*o*o,'macs':co*o*o*(ci//g)*k*k}
def cnn(h,channels,classes):
 rows=[];ci=3
 for co in channels:
  x=conv(ci,co,h);rows.append(x);h//=2;rows.append({'out':[co,h,h],'weights':0,'activations':co*h*h,'macs':0});ci=co
 n=ci*h*h;rows.append({'out':[classes],'weights':n*classes,'activations':classes,'macs':n*classes})
 return rows
check('source_dense_weights',6*2,12);check('source_dense_total',6*2+6,18)
check('dense_A',[7*5,7*5+7,3*7,3*7*5],[35,42,21,105])
check('dense_B',[4*9,4*9+4,2*4,2*4*9],[36,40,8,72])
check('conv_A',conv(4,8,16,3,2,1),{'out':[8,8,8],'weights':288,'activations':512,'macs':18432})
check('conv_B',conv(3,6,15,5,1,0),{'out':[6,11,11],'weights':450,'activations':726,'macs':54450})
check('group_A',conv(8,12,10,g=4),{'out':[12,10,10],'weights':216,'activations':1200,'macs':21600})
check('group_B',conv(12,16,8,g=4),{'out':[16,8,8],'weights':432,'activations':1024,'macs':27648})
check('depthwise_A',[8*9,8*9*100],[72,7200]);check('depthwise_B',[12*9,12*9*64],[108,6912])
check('memory_scale_A',[8*32*32,8*64*64,8*64*64/(8*32*32)],[8192,32768,4.0])
check('memory_scale_B',[12*24*24,12*36*36,12*36*36/(12*24*24)],[6912,15552,2.25])
check('peak_A',[3*16*16+8*16*16,(3*16*16+8*16*16)*4],[2816,11264])
check('peak_B',[8*16*16+16*8*8,(8*16*16+16*8*8)*2],[3072,6144])
check('storage_source',[61_000_000*4,61_000_000],[244_000_000,61_000_000])
check('storage_A',[2_400_000*2,2_400_000*.5],[4800000,1200000.0])
check('storage_B',[750000*4,750000],[3000000,750000])
source=cnn(512,[16,32,64],100)
check('seven_layer_source_diagram_weights',[r['weights'] for r in source],[432,0,4608,0,18432,0,26214400])
check('seven_layer_source_diagram_activations',[r['activations'] for r in source],[4194304,1048576,2097152,524288,1048576,262144,100])
check('seven_layer_source_diagram_MACs',[r['macs'] for r in source],[113246208,0,301989888,0,301989888,0,26214400])
check('seven_layer_source_diagram_totals',[sum(r['weights'] for r in source),sum(r['activations'] for r in source),sum(r['macs'] for r in source)],[26237872,9175140,743440384])
check('original_Q5_three_layer_totals',[sum(r['weights'] for r in source[:3]),sum(r['activations'] for r in source[:3]),sum(r['macs'] for r in source[:3])],[5040,7340032,415236096])
variants={'cnn_A':cnn(32,[8,16],10),'cnn_B':cnn(24,[6,12],5)}
check('cnn_A_totals',[sum(r['weights'] for r in variants['cnn_A']),sum(r['activations'] for r in variants['cnn_A']),sum(r['macs'] for r in variants['cnn_A'])],[11608,15370,526336])
check('cnn_B_totals',[sum(r['weights'] for r in variants['cnn_B']),sum(r['activations'] for r in variants['cnn_B']),sum(r['macs'] for r in variants['cnn_B'])],[2970,6485,188784])
check('GEMM_source',3*4*2,24);check('GEMM_A',2*5*4,40);check('GEMM_B',3*2*6,36)
check('metrics_A',[12/0.048,0.048/12,0.048*20],[250.0,0.004,0.96])
check('metrics_B',[20/0.1,0.1*15,0.1*15/20],[200.0,1.5,0.075])
check('source_magnitude',min([.05,-.9,1.2,.02],key=abs),.02)
check('magnitude_A',sorted([-.04,.7,-.2,.01],key=abs)[:2],[.01,-.04])
check('magnitude_B',sorted([-.8,.03,-.01,.6],key=abs)[:2],[-.01,.03])
check('scales_A',min([.8,-.05,.3,1.1],key=abs),-.05)
check('scales_B',min([-.4,.09,1.2,.02],key=abs),.02)
check('APoZ_A',[6/8,2/8],[.75,.25]);check('APoZ_B',[9/12,3/12],[.75,.25])
check('channel_A',[12*8*9,8*8*9,20*12*9,20*8*9],[864,576,2160,1440])
check('channel_B',[16*12*9,12*12*9,24*16*9,24*12*9],[1728,1296,3456,2592])
check('NM_A',[(4-2)/4,16*2/4],[.5,8.0]);check('NM_B',[(8-3)/8,24*3/8],[.625,9.0])
check('sensitivity_A',(100*.2+300*.6)/400,.5)
check('sensitivity_B',(200*.5+800*.25)/1000,.3)
check('iteration_A',[1000*.8**3,1-.8**3],[512.0000000000001,.4879999999999999])
check('iteration_B',[800*.75**2,1-.75**2],[450.0,.4375])
def ints(b):
 u=int(b,2);n=len(b);return [u,(-1 if b[0]=='1' else 1)*int(b[1:],2),u-2**n if b[0]=='1' else u]
check('integer_source',ints('11000000'),[192,-64,-64])
check('integer_A',ints('10100101'),[165,-37,-91])
check('integer_B',ints('11110000'),[240,-112,-16])
check('fixed_source',49/16,3.0625);check('fixed_A',(int('11101000',2)-256)/16,-1.5);check('fixed_B',int('00110110',2)/8,6.75)
check('fixed_range',[-128/16,127/16,1/16],[-8.0,7.9375,.0625])
def fp(s,E,F,e,m):
 B=2**(e-1)-1
 if E==0:return (-1)**s*(F/2**m)*2**(1-B)
 if E==2**e-1:return ('-inf' if s else 'inf') if F==0 else 'NaN'
 return (-1)**s*(1+F/2**m)*2**(E-B)
check('FP32_source',fp(0,125,2**19,8,23),.265625)
check('FP16_source',fp(1,17,768,5,10),-7.0)
check('FP16_A',fp(0,16,256,5,10),2.5)
check('FP16_B',fp(1,14,512,5,10),-.75)
check('FP32_A',fp(0,129,2**21,8,23),5.0)
check('FP32_B',fp(1,126,2**22,8,23),-.75)
check('subnormal_A',fp(0,0,3,5,10),3*2**-24)
check('subnormal_B',fp(1,0,5,5,10),-5*2**-24)
check('FP16_boundaries',[2**-24,(1-2**-10)*2**-14,2**-14,(2-2**-10)*2**15],[5.960464477539063e-08,6.097555160522461e-05,6.103515625e-05,65504.0])
check('FP32_boundaries',[2**-149,(1-2**-23)*2**-126,2**-126,(2-2**-23)*2**127],[1.401298464324817e-45,1.1754942106924411e-38,1.1754943508222875e-38,3.4028234663852886e38])
check('FP_special_A',fp(0,31,0,5,10),'inf');check('FP_special_B',fp(1,31,1,5,10),'NaN')
check('spacing',[2**-10,2**-7,2**-9],[.0009765625,.0078125,.001953125])
check('FP4_source_correction',(1+.5)*2**(3-1),6.0)
check('FP4_A',min([0,.5,1,1.5,2,3,4,6],key=lambda x:abs(x-2.7)),3)
check('FP4_B',min([0,.25,.5,1,2,4,8,16],key=lambda x:abs(x-.6)),.5)
check('quant_A',[round(.62/.25),round(.62/.25)*.25,abs(.62-round(.62/.25)*.25)],[2,.5,.12])
check('quant_B',[round(-.88/.2),round(-.88/.2)*.2,abs(-.88-round(-.88/.2)*.2)],[-4,-.8,.07999999999999996])
check('quant_clipped',[min(7,round(2/.25)),min(7,round(2/.25))*.25],[7,1.75])
output={'checks':checks,'seven_layer_source_diagram':source,'constructed_CNN':variants,'count':len(checks),'all_passed':True}
Path('quiz-work/midterm-numeric-verification.json').write_text(json.dumps(output,indent=2))
print(f'{len(checks)} checks passed; quiz-work/midterm-numeric-verification.json')
