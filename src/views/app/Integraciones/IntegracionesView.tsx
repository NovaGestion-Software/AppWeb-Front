import React from "react";
import { IntegracionMercadoPago } from "./Components/IntegracionMercadoPago";
import { IntegracionDropBox } from "./Components/IntegracionDropBox";
import { ViewTitle } from "@/frontend-resourses/components";

// import { IntegracionDropbox } from "@/components/IntegracionDropbox"; // futuro

const IntegracionesPage: React.FC = () => {

  return (
    <div>
      <ViewTitle title="Integraciones" />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl mx-auto space-y-6">
          <IntegracionMercadoPago />
          <IntegracionDropBox />
        </section>
      </main>
    </div>
  );
};

export default IntegracionesPage;
