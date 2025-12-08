#!/bin/bash

: << 'COMENTARIO'
Explicacion del Script.

El script creado es básicamente una pequeña herramienta que permite hacer copias de seguridad de la carpeta Documentos (Documents) sin tener que usar la terminal.
Cuando se ejecuta, aparece una ventana gráfica (gracias a Zenity) donde se puede seleccionar una carpeta de destino. Esa será la ubicación donde se quiere que se guarde el archivo de respaldo.
Una vez eliges esa carpeta, el script automáticamente:

1. Creará un archivo .tar.gz (un archivo comprimido) que contiene todo lo que está dentro de /Documentos.

2. A ese archivo le pone un nombre con la fecha y la hora para que no se sobrescriba ningún respaldo anterior.

3. Guarda ese respaldo dentro de la carpeta que seleccionaste.

Cuando termina, aparece un mensaje confirmando que todo se hizo bien.
Si en algún momento cancelas la selección de la carpeta, el script simplemente se detiene y te avisa que se canceló el proceso.
COMENTARIO

# Script de copia de seguridad con compresión
# Script Copia_seguridad

# Configuración - rutas 
DIR_ORIGEN="$HOME/Documentos"     # Directorio a respaldar
DIR_BACKUP="$HOME/Escritorio"     # Directorio donde se guardan los backups

# Crear directorio de backups si no existe
mkdir -p "$DIR_BACKUP"

# Fecha y hora para el nombre del archivo
FECHA=$(date +%Y-%m-%d_%H-%M-%S)
NOMBRE_ARCHIVO="Copia_de_seguridad_$FECHA.tar.gz"

# Crear la copia de seguridad comprimida
echo "Creando copia de seguridad de $DIR_ORIGEN ..."
tar -czf "$DIR_BACKUP/$NOMBRE_ARCHIVO" -C "$DIR_ORIGEN" .

echo "Copia creada en: $DIR_BACKUP/$NOMBRE_ARCHIVO"
