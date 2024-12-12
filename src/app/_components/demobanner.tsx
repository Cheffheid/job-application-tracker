import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { isDemoUser } from "../actions";

export default async function DemoBanner() {
  if (!(await isDemoUser())) {
    return <></>;
  }

  return (
    <div className="py-4">
      <Alert>
        <AlertTitle>Welcome!</AlertTitle>
        <AlertDescription>
          What you&apos;re seeing below is demo content for privacy reasons.
        </AlertDescription>
      </Alert>
    </div>
  );
}
