import successImage from '@/assets/img/success.jpg'

export function Success() {
  return (
    <div className="p-20 max-w-5xl mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <div className="flex justify-center sm:min-w-[400px]">
          <img
            src={successImage}
            alt="Success"
            className="w-[250px] h-[400px] object-cover rounded-lg max-sm:w-96 sm:h-96"
          />
        </div>
        <div>
          <h1 className="text-3xl">¡Gracias pr tu compra!</h1>
          <p className="my-3">
            Tu pedido ha sido recibido y está siendo procesado. Recibirás un
            correo electrónico de confirmación con los detalles de tu compra.
          </p>
        </div>
      </div>
    </div>
  );
}
