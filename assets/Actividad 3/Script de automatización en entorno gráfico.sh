#!/bin/bash

# Script de copia de seguridad con compresión
# Script Copia_seguridad

# Configuración   -  rutas 
DIR_ORIGEN="$HOME/Documentos"  # Directorio a respaldar
DIR_BACKUP="$HOME/Escritorio"     # Directorio donde se guardan los backups

# Crear directorio de backups si no existe
mkdir -p "$DIR_BACKUP"

# Fecha y hora para el nombre del archivo
FECHA=$(date +%Y-%m-%d_%H-%M-%S)
NOMBRE_ARCHIVO="Copia_de_seguridad_$FECHA.tar.gz"

# Crear la copia de seguridad comprimida
echo "Creando copia de seguridad de $DIR_ORIGEN ..."
tar -czf "$DIR_BACKUP/$NOMBRE_ARCHIVO" -C "$DIR_ORIGEN" .
