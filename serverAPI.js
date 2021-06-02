//para escolher qual API usar só alterar de "acima" para "abaixo"
const api_url = 'json/abaixo-10-reais.json';



//conectando com o json
async function getIss(){
    const response = await fetch (api_url);
    const data = await response.json();
    const { items } = data;



    //colocando os produtos com as informações da API
    const DOM = {
        
        //definindo o local onde será inserido os produtos
        productsContainer: document.querySelector('#main'),

        //função para inserir os produtos
        addProducts(product){

            //criando o elemento div e atribuindo uma classe e seu conteúdo
            const card = document.createElement('div')
            card.classList.add('card');
            card.innerHTML = DOM.innerHTMLTransaction(product)

           DOM.productsContainer.appendChild(card)
        },

        //definindo a estrutura dos produtos
        innerHTMLTransaction(product){

            //definindo a formatação dos valores do preço dos produtos
            const price = Utils.formatCurrency(product.price)/*preço normal*/
            const sellingPrice = Utils.formatCurrency(product.sellingPrice)/*preço de venda*/

            //estrutura dos produtos
            const html = `
                <img src="${product.imageUrl}" alt="${product.name}">
    
                <ul class="infoProduct">
                    <li class="nameProduct">${product.name}</li>
                    <li class="priceProduct">${price}</li>
                    <li class="priceSellProduct">${sellingPrice}</li>
                </ul>
            `

            return html
        },

        //Função para calcular e formatar o valor total dos produtos
        calculateTotal(){
            
            //calculando o total
            let total = 0;
            items.forEach(product => {
                total += product.sellingPrice;
                return total;
            })  
            
            
            //formatando a moeda e adicionando no html
            document.getElementById('totalPrice').innerHTML = Utils.formatCurrency(total);


            //Lógica da mensagem do frete 
            let totalFrete = total/100;
            if(totalFrete >= 10){
                let msgFrete = document.querySelector('.frete');
                msgFrete.classList.remove('overlay')
            }            
        },
        

    }
    //formatando os valores dos preços dos produtos
    const Utils = {
        formatCurrency(value){
            //formatando para números decimais
            value = Number(value)/100;
            //formatando para a moeda brasileira
            value = value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
            
           return value;
        }

    }


    //chamando todos os produtos que contém na API
    items.forEach(function(product){
        DOM.addProducts(product)
    })


    DOM.calculateTotal()
    
}
 
getIss()

