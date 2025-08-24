"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, User } from "lucide-react";
import React from "react";

interface ResumeData {
  resumeName: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  summary: string;
}

type ResumeBuilderProps = {
  resumeData?: ResumeData;
};

const ResumeBuilder = ({ resumeData }: ResumeBuilderProps) => {
  const [data, setData] = React.useState<ResumeData>(
    resumeData || {
      resumeName: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      summary: "",
    },
  );
  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving resume:", resumeData);
    // Here you would typically save to your database
    alert("Resume saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-2 text-gray-600">
            Create and preview your professional resume
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Resume Information</CardTitle>
              <CardDescription>
                Fill out your details to create your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resumeName">Resume Name</Label>
                <Input
                  id="resumeName"
                  placeholder="e.g., Software Engineer Resume"
                  value={data.resumeName}
                  onChange={(e) =>
                    handleInputChange("resumeName", e.target.value)
                  }
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={data.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={data.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={data.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State 12345"
                    value={data.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Brief description of your professional background and key skills..."
                    className="min-h-[120px]"
                    value={data.summary}
                    onChange={(e) =>
                      handleInputChange("summary", e.target.value)
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save Resume
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>Live preview of your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-8 shadow-sm min-h-[600px]">
                {/* Header */}
                <div className="text-center border-b pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {data.name || "Your Name"}
                  </h1>

                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{data.phone}</span>
                      </div>
                    )}
                    {data.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{data.email}</span>
                      </div>
                    )}
                    {data.address && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{data.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Summary */}
                {data.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {data.summary}
                    </p>
                  </div>
                )}

                {/* Placeholder sections */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-1">
                      Experience
                    </h2>
                    <p className="text-gray-500 italic">
                      Experience section will appear here...
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-1">
                      Education
                    </h2>
                    <p className="text-gray-500 italic">
                      Education section will appear here...
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-1">
                      Skills
                    </h2>
                    <p className="text-gray-500 italic">
                      Skills section will appear here...
                    </p>
                  </div>
                </div>

                {/* Empty state */}
                {!data.name && !data.email && !data.phone && !data.summary && (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Start filling out the form to see your resume preview
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
