import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/*
  ContadorConcurrente.java
  Demostración simple de concurrencia usando 3 hilos que incrementan
  un contador compartido protegido con Lock.
 */

public class ContadorConcurrente {

    // Clase que representa el recurso compartido
    static class Contador {
        private long valor = 0;
        private final Lock candado = new ReentrantLock();

        public void incrementar() {
            candado.lock();
            try {
                valor++;
            } finally {
                candado.unlock();
            }
        }

        public long obtenerValor() {
            candado.lock();
            try {
                return valor;
            } finally {
                candado.unlock();
            }
        }
    }

    // Tarea que cada hilo ejecutará
    static class TareaIncremento implements Runnable {
        private final Contador contador;
        private final long repeticiones;
        private final String nombre;

        public TareaIncremento(Contador contador, long repeticiones, String nombre) {
            this.contador = contador;
            this.repeticiones = repeticiones;
            this.nombre = nombre;
        }

        @Override
        public void run() {
            for (long i = 0; i < repeticiones; i++) {
                contador.incrementar();
                try { Thread.sleep(1); } catch (InterruptedException ignored) {}
            }
            System.out.printf("%s terminó. Incrementó %d veces.%n", nombre, repeticiones);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        long repeticiones = 100_000; // por defecto
        int numeroHilos = 3;         // mínimo requerido por la actividad

        if (args.length >= 1) {
            try { repeticiones = Long.parseLong(args[0]); } catch (NumberFormatException ignored) {}
        }
        if (args.length >= 2) {
            try { numeroHilos = Integer.parseInt(args[1]); } catch (NumberFormatException ignored) {}
            if (numeroHilos < 1) numeroHilos = 3;
        }

        Contador contador = new Contador();
        Thread[] hilos = new Thread[numeroHilos];

        System.out.printf("Iniciando %d hilos, cada uno incrementa %d veces (total esperado = %d)%n",
                numeroHilos, repeticiones, repeticiones * (long) numeroHilos);

        for (int i = 0; i < numeroHilos; i++) {
            hilos[i] = new Thread(
                    new TareaIncremento(contador, repeticiones, "Hilo-" + (i + 1)),
                    "Hilo-" + (i + 1)
            );
            hilos[i].start();
        }

        // Esperar a que todos los hilos terminen
        for (Thread hilo : hilos) hilo.join();

        System.out.printf("Valor final del contador: %d%n", contador.obtenerValor());
        System.out.println("Programa terminado.");
    }


}
