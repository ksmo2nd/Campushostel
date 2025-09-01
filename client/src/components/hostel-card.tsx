import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Zap, Droplets, Shield, Car, Utensils, Users, Book, Coffee } from "lucide-react";

interface HostelCardProps {
  hostel: any;
  onBookInspection: (hostel: any) => void;
}

export default function HostelCard({ hostel, onBookInspection }: HostelCardProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'generator': case '24/7 power': return <Zap className="h-4 w-4" />;
      case 'water': case '24/7 water': return <Droplets className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'kitchen': return <Utensils className="h-4 w-4" />;
      case 'shared': return <Users className="h-4 w-4" />;
      case 'study room': return <Book className="h-4 w-4" />;
      case 'lounge': return <Coffee className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const defaultImage = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";

  return (
    <Card className="overflow-hidden card-hover cursor-pointer" data-testid={`card-hostel-${hostel.id}`}>
      <img 
        src={hostel.images?.[0] || defaultImage}
        alt={hostel.title}
        className="w-full h-48 object-cover"
        data-testid={`img-hostel-${hostel.id}`}
      />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground" data-testid={`text-hostel-title-${hostel.id}`}>
            {hostel.title}
          </h3>
          <Badge 
            variant={hostel.availability ? "default" : "secondary"}
            className={hostel.availability ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
            data-testid={`badge-availability-${hostel.id}`}
          >
            {hostel.availability ? "Available" : "Not Available"}
          </Badge>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm" data-testid={`text-location-${hostel.id}`}>
            {hostel.location?.name || 'Location not specified'}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4" data-testid={`text-description-${hostel.id}`}>
          {hostel.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-foreground" data-testid={`text-price-${hostel.id}`}>
              {formatPrice(hostel.price)}
            </span>
            <span className="text-muted-foreground text-sm">
              /{hostel.priceType || 'semester'}
            </span>
          </div>
          <Button 
            onClick={() => onBookInspection(hostel)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!hostel.availability}
            data-testid={`button-book-inspection-${hostel.id}`}
          >
            Book Inspection
          </Button>
        </div>
        
        {hostel.amenities && hostel.amenities.length > 0 && (
          <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground" data-testid={`amenities-${hostel.id}`}>
            {hostel.amenities.slice(0, 3).map((amenity: string, index: number) => (
              <div key={index} className="flex items-center" data-testid={`amenity-${hostel.id}-${index}`}>
                {getAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </div>
            ))}
            {hostel.amenities.length > 3 && (
              <span className="text-xs" data-testid={`amenities-more-${hostel.id}`}>
                +{hostel.amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
