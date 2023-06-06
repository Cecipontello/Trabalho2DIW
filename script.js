
//Mostrando os produtos da API na página principal, Maria Cecília Pontello Costa

async function getProdutos() {

              const response = await fetch('https://fakestoreapi.com/products?limit=9');
              const produtos = await response.json();
              const cardContainer = document.getElementById('div_row');
          
              produtos.forEach(produto => {
                const card = document.createElement('div');
                card.className = 'card';
          
                const image = document.createElement('img');
                image.src = produto.image;
                image.alt = produto.title;
                card.appendChild(image);
          
                const title = document.createElement('h2');
                title.textContent = produto.title;
                card.appendChild(title);
          
                const description = document.createElement('p');
                description.textContent = produto.description;
                card.appendChild(description);
          
                const butão = document.createElement('butão');
                butão.className = 'btn btn-primary';
                butão.textContent = 'Ver Detalhes';
                butão.addEventListener('click', () => {

                  window.location.href = `detalhes.html?id=${produto.id}`;
                });
                card.appendChild(butão);
          
                cardContainer.appendChild(card);
              });
            }
          
            getProdutos();

//Mostrando o produto clicado em uma página de detalhes, Maria Cecília Pontello Costa

            document.addEventListener('DOMContentLoaded', function() {

                const urlParams = new URLSearchParams(window.location.search);
                const productId = urlParams.get('id');
              
                async function getDetalhes(id) {
                  try {
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                    const data = await response.json();
              
                    exibirDetalhes(data);
                  } catch (error) {
                    console.log('Erro ao buscar os detalhes do produto:', error);
                  }
                }
              
                function exibirDetalhes(produto) {
                  const productDetails = document.getElementById('DetalhesProdutos');
              
                  const title = document.createElement('h2');
                  title.textContent = produto.title;

                  const image = document.createElement('img');
                  image.textContent = produto.image;
                  image.src = produto.image;
                  image.alt = produto.title;
                
              
                  const price = document.createElement('p');
                  price.textContent = `Preço: $${produto.price}`;
              
                  const description = document.createElement('p');
                  description.textContent = produto.description;
              
                  productDetails.appendChild(title);
                  productDetails.appendChild(image);
                  productDetails.appendChild(price);
                  productDetails.appendChild(description);
                  
                }
              
                getDetalhes(productId);
              });
          
//Tornando a pesquisa por categorias funcional, Maria Cecilia Pontello Costa 

$(document).ready(function() {
        $('#PesquisaForm').on('submit', function(e) {
            e.preventDefault();
            var searchTerm = $('#barra_de_pesquisa').val();
            searchProducts(searchTerm);
        });

function searchProducts(category) {
        $.ajax({
            url: 'https://fakestoreapi.com/products/category/' + category,
            method: 'GET',
            success: function(data) {
                displayResults(data);
            },
            error: function() {
                alert('Ocorreu um erro ao carregar os resultados da pesquisa.');
            }
        });
    }

function displayResults(products) {
        var resultsHtml = '';
        if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                resultsHtml += '<div class="product">';
                resultsHtml += '<h3>' + product.title + '</h3>';
                resultsHtml += '<p>' + product.description + '</p>';
                resultsHtml += '</div>';
            }
        } else {
            resultsHtml = '<p>Nenhum produto encontrado.</p>';
        }

        localStorage.setItem('searchResults', resultsHtml);

        window.location.href = 'resultados.html';
    }
  });

