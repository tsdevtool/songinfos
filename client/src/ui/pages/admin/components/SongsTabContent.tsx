import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music, PlusCircle } from "lucide-react";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="text-emerald-500 size-5" />
              Songs Library
            </CardTitle>
            <CardDescription>Manager your music tracks</CardDescription>
          </div>
          <Button>
            <PlusCircle /> Add Song
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
