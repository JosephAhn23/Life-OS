<!-- ================= JAVASCRIPT ================= -->
<script>
/* ===== HELPERS ===== */
const pad=n=>String(n).padStart(2,"0");
const fmt=s=>`${pad(s/3600|0)}:${pad(s%3600/60|0)}:${pad(s%60)}`;
const dl=(t,n)=>{const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(t);a.download=n;a.click();};

/* ===== DOCTOR APP 1 ===== */
let r1=[],t1=null,i1=null;
start1.onclick=()=>{ if(i1) return; t1=Date.now(); i1=setInterval(()=>timer1.textContent=fmt((Date.now()-t1)/1000|0),1000); };
stop1.onclick=()=>{ clearInterval(i1); i1=null;
  const h=((Date.now()-t1)/3600000).toFixed(2);
  r1.push({date:new Date().toISOString().slice(0,10),hours:h});
  dl("date,hours\n"+r1.map(x=>`${x.date},${x.hours}`).join("\n"),"doctor_full.csv");
  timer1.textContent="00:00:00";
};
newCsv1.onclick=()=>{ r1=[]; dl("date,hours\n","doctor_full.csv"); };

/* ===== DOCTOR APP 2 ===== */
let r2=[],t2=null,i2=null;
start2.onclick=()=>{ if(i2) return; t2=Date.now(); i2=setInterval(()=>timer2.textContent=fmt((Date.now()-t2)/1000|0),1000); };
stop2.onclick=()=>{ clearInterval(i2); i2=null;
  const s=((Date.now()-t2)/1000|0);
  r2.push({date:new Date().toISOString().slice(0,10),sec:s});
  dl("date,seconds\n"+r2.map(x=>`${x.date},${x.sec}`).join("\n"),"doctor_timer.csv");
  timer2.textContent="00:00:00";
};
newCsv2.onclick=()=>{ r2=[]; dl("date,seconds\n","doctor_timer.csv"); };

/* ===== INCOME ===== */
function calcIncome(){
  const score=(+saas.value||0)*10+(+projects.value||0)*6+(+cgpa.value||0)*4-(+bf.value||0)*0.5;
  incomeResult.textContent="Score: "+score.toFixed(2);
}

/* ===== THREE.JS SPHERE ===== */
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:bg,alpha:true});
renderer.setSize(innerWidth,innerHeight);
camera.position.z=6;

const sphere=new THREE.Mesh(
  new THREE.SphereGeometry(3,64,64),
  new THREE.MeshBasicMaterial({color:0x6366f1,wireframe:true})
);
scene.add(sphere);

(function animate(){
  requestAnimationFrame(animate);
  sphere.rotation.y+=0.003;
  sphere.rotation.x+=0.001;
  renderer.render(scene,camera);
})();
</script>

</body>
</html>
