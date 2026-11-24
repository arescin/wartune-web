FROM nginx:alpine

# Remove configuração default do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/wartune-web.conf

# Copia os arquivos do cliente HTML5
COPY . /usr/share/nginx/html/

# Remove arquivos desnecessários da imagem final
RUN rm -f /usr/share/nginx/html/server.js /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
