import { FlexibleInputField } from "@/frontend-resourses/components";

export default function Total() {
  return (
    <div className="row-start-2 col-start-13 right-5 v1440:col-start-12 v1440:right-4 relative v1536:col-start-13 
    v1536:right-0 col-span-2 v1920:col-start-11 v1920:left-4 v1920:col-span-1 self-end  bg-white p-1 rounded-sm">
      <FlexibleInputField inputType="number" value="0.00" inputClassName="text-end text-blue-900 text-xl" />
    </div>
  );
}
