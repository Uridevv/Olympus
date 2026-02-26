export function TermsAndConditions() {
  return (
    <div className="p-4 md:p-8 text-foreground-description">
      <h1 className="text-2xl font-bold mb-4 text-foreground">
        Términos y Condiciones
      </h1>
      <p className="mb-4">
        Estos términos y condiciones describen las reglas y regulaciones para el
        uso del sitio web de OlympusTS, ubicado en [URL del sitio web].
      </p>
      <p className="mb-4">
        Al acceder a este sitio web, asumimos que aceptas estos términos y
        condiciones. No continúes usando OlympusTS si no estás de acuerdo con
        todos los términos y condiciones establecidos en esta página.
      </p>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">
          1. Elegibilidad de la Oferta
        </h2>
        <p className="mb-4 ml-4">
          Las ofertas y promociones son válidas únicamente para compras
          realizadas a través de nuestro sitio web oficial. Para ser elegible,
          los clientes deben cumplir con todos los requisitos especificados en
          la promoción, que pueden incluir, entre otros, una compra mínima, la
          compra de productos específicos o la aplicación de un código de
          descuento al momento de la compra.
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">
          2. Período de Validez
        </h2>
        <p className="mb-4 ml-4">
          Cada oferta tendrá un período de validez claramente indicado. Las
          compras realizadas fuera de este período no serán elegibles para la
          promoción. OlympusTS se reserva el derecho de modificar o cancelar
          cualquier oferta en cualquier momento sin previo aviso.
        </p>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">
          3. Uso de Códigos Promocionales
        </h2>
        <p className="mb-4 ml-4">
          Los códigos promocionales deben ser aplicados en el carrito de compras
          antes de finalizar el pago. No se aplicarán descuentos de forma
          retroactiva a compras ya completadas. Los códigos no son transferibles
          y no pueden ser canjeados por efectivo.
        </p>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">4. Limitaciones</h2>
        <p className="mb-4 ml-4">
          Las ofertas no son acumulables con otras promociones a menos que se
          especifique lo contrario. Las promociones de "envío gratis" aplican
          únicamente a envíos estándar dentro del territorio nacional. OlympusTS
          se reserva el derecho de limitar la cantidad de artículos por cliente.
        </p>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">
          5. Devoluciones y Cambios
        </h2>
        <p className="mb-4 ml-4">
          Los productos adquiridos bajo una promoción especial están sujetos a
          nuestra política de devoluciones estándar. Si se devuelve un producto
          que formaba parte de una oferta, el reembolso se ajustará para
          reflejar el descuento recibido.
        </p>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">6. Ley Aplicable</h2>
        <p className="mb-4 ml-4">
          Estos términos y condiciones se regirán e interpretarán de acuerdo con
          las leyes de [País/Estado], y te sometes irrevocablemente a la
          jurisdicción exclusiva de los tribunales de ese Estado o ubicación.
        </p>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mt-6 mb-2 text-secondary-foreground">7. Contacto</h2>
        <p className="mb-4 ml-4">
          Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes
          contactarnos a través de nuestro correo electrónico: [correo
          electrónico de soporte].
        </p>
      </div>
    </div>
  );
}
