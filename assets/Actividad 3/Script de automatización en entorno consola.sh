#!/usr/bin/env bash
# Copia_Seguridad_cli.sh
# Script de consola para crear copias comprimidas (.tar.gz)

# Descripción:
#   Crea un archivo .tar.gz con el contenido de la carpeta
#   de origen indicada y lo guarda en la carpeta destino.
#   Incluye validaciones básicas, creación automática del
#   directorio destino si no existe y salida informativa.
# Uso:
#   ./ Copia_Seguridad_cli.sh -s <origen> -d <destino>
#
# Opciones:
#   -s <ruta>   Carpeta o archivo de origen a respaldar.
#   -d <ruta>   Carpeta destino donde se guardará el .tar.gz.
#   -h          Muestra esta ayuda.
#
# Códigos de salida:
#   0  Éxito
#   1  Parámetros faltantes o uso incorrecto
#   2  Origen no existe
#   3  No se pudo crear carpeta destino
#   4  Error al crear el backup
# --------------------------------------------------------

set -o errexit    # salir si algún comando falla
set -o nounset    # error por uso de variables no definidas
set -o pipefail   # pipeline falla si cualquiera falla

# Función que muestra la ayuda/uso
usage() {
  cat <<EOF
Uso: $0 -s <origen> -d <destino>

Ejemplo:
  $0 -s ~/Documentos -d ~/Backups

Descripción:
  Crea un archivo comprimido .tar.gz con el contenido de <origen>
  y lo escribe en la carpeta <destino> (se crea si no existe).
EOF
  exit 1
}

# Parseo de argumentos con getopts
if [ $# -eq 0 ]; then
  usage
fi

while getopts "s:d:h" opt; do
  case "$opt" in
    s) SRC="$OPTARG" ;;
    d) DEST="$OPTARG" ;;
    h) usage ;;
    *) usage ;;
  esac
done

# Validaciones básicas de parámetros
if [ -z "${SRC:-}" ]; then
  echo "[ERROR] Falta el parámetro -s (origen)." >&2
  usage
fi

if [ -z "${DEST:-}" ]; then
  echo "[ERROR] Falta el parámetro -d (destino)." >&2
  usage
fi

# Comprobar que la ruta de origen existe
if [ ! -e "$SRC" ]; then
  echo "[ERROR] La ruta de origen no existe: $SRC" >&2
  exit 2
fi

# Si el destino no existe, intentamos crearlo
if [ ! -d "$DEST" ]; then
  echo "[INFO] La carpeta destino no existe. Intentando crear: $DEST"
  if ! mkdir -p "$DEST"; then
    echo "[ERROR] No se pudo crear la carpeta destino: $DEST" >&2
    exit 3
  fi
fi

# Preparar nombre del backup con timestamp para evitar sobrescribir
timestamp=$(date +%Y%m%d-%H%M%S)
base_origen=$(basename "$SRC")
backup_file="$DEST/backup-${base_origen}-$timestamp.tar.gz"

# Salida informativa para el usuario
echo "----------------------------------------"
echo " ORIGEN : $SRC"
echo " DESTINO: $backup_file"
echo "----------------------------------------"
echo "Creando copia de seguridad..."

# Crear el archivo .tar.gz
# -C "$(dirname "$SRC")" -> nos posiciona en la carpeta padre para preservar nombre
# "$(basename "$SRC")" -> añade sólo el nombre de la carpeta/archivo al tar
if tar -czf "$backup_file" -C "$(dirname "$SRC")" "$base_origen"; then
  echo "Backup creado exitosamente:"
  echo "$backup_file"
  exit 0
else
  echo "[ERROR] Error al crear el backup." >&2
  exit 4
fi
