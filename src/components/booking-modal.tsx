'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

interface BookingModalProps {
  hostel: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ hostel, isOpen, onClose }: BookingModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Inspection Booked!",
        description: "Your inspection request has been sent to the agent.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      onClose();
      setFormData({ preferredDate: "", preferredTime: "", message: "" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Booking Failed",
        description: "Failed to book inspection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the inspection.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate({
      hostelId: hostel.id,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-4 max-h-screen overflow-y-auto" data-testid="modal-booking">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">Book Inspection</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-booking">
          <div className="mb-4">
            <h4 className="font-medium text-foreground mb-2" data-testid="text-hostel-name">{hostel.title}</h4>
            <p className="text-sm text-muted-foreground" data-testid="text-hostel-location">
              {hostel.location?.name || 'Location not specified'}
            </p>
          </div>

          <div>
            <Label htmlFor="preferredDate" className="text-sm font-medium text-foreground" data-testid="label-preferred-date">
              Preferred Date
            </Label>
            <Input
              id="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange("preferredDate", e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full mt-2"
              required
              data-testid="input-preferred-date"
            />
          </div>
          
          <div>
            <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground" data-testid="label-preferred-time">
              Preferred Time
            </Label>
            <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
              <SelectTrigger className="w-full mt-2" data-testid="select-preferred-time">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning" data-testid="option-morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                <SelectItem value="afternoon" data-testid="option-afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                <SelectItem value="evening" data-testid="option-evening">Evening (4:00 PM - 6:00 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-foreground" data-testid="label-message">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Any specific requirements or questions..."
              className="w-full mt-2"
              rows={3}
              data-testid="textarea-message"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={bookingMutation.isPending}
              data-testid="button-book-inspection"
            >
              {bookingMutation.isPending ? "Booking..." : "Book Inspection"}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={bookingMutation.isPending}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
