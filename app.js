const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const products={
diamonds:[["25 Diamond",45],["50 Diamond",80],["115 Diamond",120],["240 Diamond",245],["355 Diamond",350],["480 Diamond",460],["610 Diamond",565],["725 Diamond",680],["850 Diamond",775],["1090 Diamond",1010],["1240 Diamond",1110],["1720 Diamond",1570],["2090 Diamond",1880],["2530 Diamond",2185],["3770 Diamond",3140],["5060 Diamond",4280],["7590 Diamond",6370]],
membership:[["Weekly",220],["Weekly Lite",90],["Monthly",1100]],
evo:[["Evo Access 3 Days",0],["Evo Access 7 Days",0],["Evo Access 30 Days",0]],
level:[["Level of pass",610]]
};
let active="diamonds", selected=null;
function render(){products[active].forEach(()=>{});document.getElementById("products").innerHTML=products[active].map(p=>p[1]?`<div class="card"><div class="badge">SALE</div><div class="name">${p[0]}</div><div class="price">NPR ${p[1]}</div><div class="limit">Max 1 per order</div><button class="cart" onclick='openOrder(${JSON.stringify(p[0])},${p[1]})'>🛒</button></div>`:`<div class="card"><div class="name">${p[0]}</div><div class="limit" style="color:#df6872;font-size:18px">Out of Stock</div></div>`).join("")}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{active=b.dataset.tab;document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
function openAccount(){accountModal.classList.add("show");refreshUser()}function closeAccount(){accountModal.classList.remove("show")}
function openOrder(name,price){selected={name,price};orderTitle.textContent=name;orderPrice.textContent="Amount: NPR "+price;orderModal.classList.add("show")}
function closeOrder(){orderModal.classList.remove("show")}
async function signUp(){authMessage.textContent="";const n=name.value.trim();const e=email.value.trim();if(!n||!e||password.value.length<8){authMessage.textContent="Enter your name, valid email, and a password of at least 8 characters.";return}const {error}=await sb.auth.signUp({email:e,password:password.value,options:{data:{full_name:n}}});authMessage.textContent=error?error.message:"Account created. Check your email if confirmation is enabled.";if(!error)refreshUser()}
async function signIn(){const {error}=await sb.auth.signInWithPassword({email:email.value.trim(),password:password.value});authMessage.textContent=error?error.message:"Signed in successfully.";if(!error)refreshUser()}
async function signOut(){await sb.auth.signOut();refreshUser()}
async function refreshUser(){const {data:{user}}=await sb.auth.getUser();signedOut.hidden=!!user;signedIn.hidden=!user;if(!user)return;userInfo.textContent=user.email;const {data:p}=await sb.from("profiles").select("role").eq("id",user.id).single();adminLink.hidden=!p||p.role!=="admin"}
async function submitOrder(){const {data:{user}}=await sb.auth.getUser();if(!user){closeOrder();openAccount();authMessage.textContent="Please sign in first.";return}const ref=paymentReference.value.trim();if(!ref){orderMessage.textContent="Enter your payment transaction/reference ID.";return}const {error}=await sb.from("orders").insert({user_id:user.id,product_name:selected.name,amount:selected.price,payment_reference:ref});orderMessage.textContent=error?error.message:"Order submitted as Pending. The administrator will review it.";if(!error){paymentReference.value="";setTimeout(closeOrder,1000)}}
sb.auth.onAuthStateChange(()=>refreshUser());render();refreshUser();