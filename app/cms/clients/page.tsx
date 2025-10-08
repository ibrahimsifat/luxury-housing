"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Client } from "@/lib/types";
import { ArrowLeft, Edit, ExternalLink, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/cms/clients");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        setError("Failed to fetch clients");
      }
    } catch (error) {
      setError("Error fetching clients");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      const response = await fetch(`/api/cms/clients/${clientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClients(clients.filter((client) => client.id !== clientId));
      } else {
        alert("Failed to delete client");
      }
    } catch (error) {
      alert("Error deleting client");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/cms/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Clients Management
              </h1>
              <p className="text-slate-600 mt-2">
                Manage your client logos and information
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {clients.length} Client{clients.length !== 1 ? "s" : ""}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {clients.filter((c) => c.featured).length} Featured
              </Badge>
            </div>
            <Link href="/cms/clients/add">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Client
              </Button>
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Clients Grid */}
        {clients.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-slate-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No clients found
              </h3>
              <p className="text-slate-600 mb-4">
                Get started by adding your first client
              </p>
              <Link href="/cms/clients/add">
                <Button>Add New Client</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clients.map((client) => (
              <Card
                key={client.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {client.featured && (
                        <Badge variant="default" className="text-xs">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Order: {client.order}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link href={`/cms/clients/${client.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    {/* Client Logo */}
                    <div className="mb-4 flex justify-center">
                      <div className="w-20 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={80}
                          height={80}
                          className="object-contain max-w-full max-h-full"
                        />
                      </div>
                    </div>

                    {/* Client Name */}
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {client.name}
                    </h3>

                    {/* Client Description */}
                    {client.description && (
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {client.description}
                      </p>
                    )}

                    {/* Client Website */}
                    {client.website && (
                      <div className="mb-3">
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Visit Website
                        </a>
                      </div>
                    )}

                    {/* Client Category */}
                    {client.category && (
                      <Badge variant="secondary" className="text-xs">
                        {client.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
