/* ==========================================================
   DJ DIEGO BELGRADO
   script.js
   BLOCO 1
   Menu Mobile + Header + Scroll + Botão Topo
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MENU MOBILE
    ========================================== */

    const menuMobile = document.querySelector(".menu-mobile");
    const menu = document.querySelector("nav ul");

    if (menuMobile && menu) {

        menuMobile.addEventListener("click", () => {

            menu.classList.toggle("ativo");

            const icon = menuMobile.querySelector("i");

            if (icon) {

                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");

            }

        });

        menu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("ativo");

                const icon = menuMobile.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }

    /* ==========================================
       HEADER AO ROLAR
    ========================================== */

    const header = document.querySelector("header");

    function atualizarHeader() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("header-scroll");

        } else {

            header.classList.remove("header-scroll");

        }

    }

    atualizarHeader();

    window.addEventListener("scroll", atualizarHeader);

    /* ==========================================
       SCROLL SUAVE
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const destino = document.querySelector(this.getAttribute("href"));

            if (destino) {

                e.preventDefault();

                destino.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        });

    });

    /* ==========================================
       BOTÃO VOLTAR AO TOPO
    ========================================== */

    const btnTopo = document.createElement("button");

    btnTopo.className = "btn-topo";

    btnTopo.innerHTML = '<i class="fas fa-chevron-up"></i>';

    document.body.appendChild(btnTopo);

    function controlarBotaoTopo() {

        if (window.scrollY > 500) {

            btnTopo.classList.add("mostrar");

        } else {

            btnTopo.classList.remove("mostrar");

        }

    }

    controlarBotaoTopo();

    window.addEventListener("scroll", controlarBotaoTopo);

    btnTopo.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

});
/* ==========================================================
   DJ DIEGO BELGRADO
   SCRIPT.JS
   BLOCO 2
   Contadores + Scroll Reveal + Cards
========================================================== */


/* ==========================================
   CONTADORES ANIMADOS
========================================== */

const numeros = document.querySelectorAll(".numero h2");

const animarContadores = () => {

    numeros.forEach(numero => {

        const textoOriginal = numero.innerText;

        const valorFinal = parseInt(textoOriginal.replace(/\D/g, ""));

        if (!valorFinal) return;

        let valorAtual = 0;

        const incremento = Math.ceil(valorFinal / 80);

        const atualizar = () => {

            valorAtual += incremento;

            if (valorAtual >= valorFinal) {

                numero.innerText = textoOriginal;

                return;

            }

            if (textoOriginal.includes("+")) {

                numero.innerText = valorAtual + "+";

            } else if (textoOriginal.includes("%")) {

                numero.innerText = valorAtual + "%";

            } else {

                numero.innerText = valorAtual;

            }

            requestAnimationFrame(atualizar);

        };

        atualizar();

    });

};


/* ==========================================
   OBSERVER DOS CONTADORES
========================================== */

const secaoNumeros = document.querySelector(".numeros");

if (secaoNumeros) {

    const observerContador = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animarContadores();

                observerContador.disconnect();

            }

        });

    }, {

        threshold: 0.5

    });

    observerContador.observe(secaoNumeros);

}


/* ==========================================
   ANIMAÇÃO DAS SEÇÕES
========================================== */

const elementosAnimados = document.querySelectorAll(

    "section, .card, .foto, .depoimento, .evento, .habilidade"

);

elementosAnimados.forEach(el => {

    el.style.opacity = "0";

    el.style.transform = "translateY(60px)";

    el.style.transition = "all .8s ease";

});


const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold:0.15

});


elementosAnimados.forEach(el => {

    observer.observe(el);

});


/* ==========================================
   HOVER NOS CARDS
========================================== */

const cards = document.querySelectorAll(

    ".card, .depoimento, .evento"

);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ==========================================
   EFEITO 3D NO MOUSE
========================================== */

const efeito3D = document.querySelectorAll(".card");

efeito3D.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotY = ((x / rect.width) - 0.5) * 12;

        const rotX = ((y / rect.height) - 0.5) * -12;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotX}deg)
             rotateY(${rotY}deg)
             scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =

            "perspective(900px) rotateX(0) rotateY(0) scale(1)";

    });

});


/* ==========================================
   BRILHO AO PASSAR O MOUSE
========================================== */

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.background =

        `radial-gradient(circle at ${x}px ${y}px,
        rgba(0,191,255,.18),
        #181818 70%)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "#181818";

    });

});
/* ==========================================================
   DJ DIEGO BELGRADO
   SCRIPT.JS
   BLOCO 3
   Lightbox + Slider + Vídeos
==========================================================*/

/* ==========================================
   LIGHTBOX DA GALERIA
========================================== */

const fotos = document.querySelectorAll(".foto img");

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <span class="fechar-lightbox">&times;</span>
    <img class="lightbox-img" src="" alt="">
`;

document.body.appendChild(lightbox);

const imagemLightbox = lightbox.querySelector(".lightbox-img");

const fechar = lightbox.querySelector(".fechar-lightbox");

let indiceAtual = 0;

const listaImagens = [...fotos];

fotos.forEach((foto, indice)=>{

    foto.addEventListener("click",()=>{

        indiceAtual = indice;

        imagemLightbox.src = foto.src;

        lightbox.classList.add("ativo");

        document.body.style.overflow="hidden";

    });

});

function atualizarImagem(){

    imagemLightbox.src = listaImagens[indiceAtual].src;

}

fechar.addEventListener("click",()=>{

    lightbox.classList.remove("ativo");

    document.body.style.overflow="auto";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("ativo");

        document.body.style.overflow="auto";

    }

});


/* ==========================================
   TECLADO
========================================== */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("ativo")) return;

    if(e.key==="Escape"){

        lightbox.classList.remove("ativo");

        document.body.style.overflow="auto";

    }

    if(e.key==="ArrowRight"){

        indiceAtual++;

        if(indiceAtual>=listaImagens.length){

            indiceAtual=0;

        }

        atualizarImagem();

    }

    if(e.key==="ArrowLeft"){

        indiceAtual--;

        if(indiceAtual<0){

            indiceAtual=listaImagens.length-1;

        }

        atualizarImagem();

    }

});


/* ==========================================
   SLIDER DEPOIMENTOS
========================================== */

const cardsDepoimentos = document.querySelectorAll(".depoimento");

let depoimentoAtual = 0;

function mostrarDepoimento(){

    cardsDepoimentos.forEach((card,index)=>{

        if(index===depoimentoAtual){

            card.style.display="block";

            card.style.opacity="1";

        }else{

            card.style.display="none";

            card.style.opacity="0";

        }

    });

}

if(cardsDepoimentos.length>0){

    mostrarDepoimento();

    setInterval(()=>{

        depoimentoAtual++;

        if(depoimentoAtual>=cardsDepoimentos.length){

            depoimentoAtual=0;

        }

        mostrarDepoimento();

    },5000);

}


/* ==========================================
   CONTROLE DOS VÍDEOS
========================================== */

const videos=document.querySelectorAll("video");

videos.forEach(video=>{

    video.addEventListener("play",()=>{

        videos.forEach(outro=>{

            if(outro!==video){

                outro.pause();

            }

        });

    });

});


/* ==========================================
   HOVER DOS VÍDEOS
========================================== */

videos.forEach(video=>{

    video.addEventListener("mouseenter",()=>{

        video.style.transform="scale(1.02)";

        video.style.boxShadow="0 0 25px rgba(0,191,255,.5)";

    });

    video.addEventListener("mouseleave",()=>{

        video.style.transform="scale(1)";

        video.style.boxShadow="none";

    });

});


/* ==========================================
   ZOOM NAS FOTOS
========================================== */

fotos.forEach(foto=>{

    foto.addEventListener("mouseenter",()=>{

        foto.style.transform="scale(1.08)";

    });

    foto.addEventListener("mouseleave",()=>{

        foto.style.transform="scale(1)";

    });

});
/* ==========================================================
   DJ DIEGO BELGRADO
   SCRIPT.JS
   BLOCO 4
   Formulário + Typing + Inicialização
==========================================================*/

/* ==========================================
   FORMULÁRIO
========================================== */

const formulario = document.querySelector(".formulario form");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        const nome = formulario.querySelector('input[type="text"]');
        const email = formulario.querySelector('input[type="email"]');
        const telefone = formulario.querySelector('input[type="tel"]');
        const evento = formulario.querySelectorAll('input[type="text"]')[1];
        const mensagem = formulario.querySelector("textarea");

        if (
            nome.value.trim() === "" ||
            email.value.trim() === "" ||
            mensagem.value.trim() === ""
        ) {

            alert("Preencha todos os campos obrigatórios.");

            return;

        }

        alert("Solicitação enviada com sucesso!");

        formulario.reset();

    });

}

/* ==========================================
   EFEITO DIGITAÇÃO
========================================== */

const titulo = document.querySelector(".banner-content h2");

if (titulo) {

    const textoOriginal = titulo.innerText;

    titulo.innerHTML = "";

    let i = 0;

    function escrever() {

        if (i < textoOriginal.length) {

            titulo.innerHTML += textoOriginal.charAt(i);

            i++;

            setTimeout(escrever, 55);

        }

    }

    escrever();

}

/* ==========================================
   BOTÕES COM RIPPLE
========================================== */

document.querySelectorAll(".btn,.btn-outline").forEach(botao => {

    botao.addEventListener("click", function (e) {

        const circulo = document.createElement("span");

        circulo.className = "ripple";

        const rect = this.getBoundingClientRect();

        circulo.style.left = (e.clientX - rect.left) + "px";
        circulo.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(circulo);

        setTimeout(() => {

            circulo.remove();

        }, 600);

    });

});

/* ==========================================
   DESTACA MENU CONFORME A SEÇÃO
========================================== */

const secoes = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let atual = "";

    secoes.forEach(secao => {

        const topo = secao.offsetTop - 120;
        const altura = secao.offsetHeight;

        if (window.scrollY >= topo &&
            window.scrollY < topo + altura) {

            atual = secao.id;

        }

    });

    links.forEach(link => {

        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + atual) {

            link.classList.add("ativo");

        }

    });

});

/* ==========================================
   ANO AUTOMÁTICO
========================================== */

const copy = document.querySelector(".copy p");

if (copy) {

    copy.innerHTML =
        `© ${new Date().getFullYear()} DJ Diego Belgrado. Todos os direitos reservados.`;

}

/* ==========================================
   FINALIZAÇÃO
========================================== */

console.log("%cSite DJ Diego Belgrado carregado com sucesso!",
"color:#00bfff;font-size:18px;font-weight:bold;");