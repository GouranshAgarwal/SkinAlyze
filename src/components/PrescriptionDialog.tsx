// PrescriptionDialog.jsx
import React, { useState } from 'react';
import { Search, X, PlusCircle, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const PrescriptionDialog = ({ open, onOpenChange, patient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptionItems, setPrescriptionItems] = useState([
    { id: 1, name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  // Example medications for search
  const medications = [
    { id: 1, name: 'Tretinoin Cream 0.025%', type: 'Topical Retinoid', recommended: true },
    { id: 2, name: 'Benzoyl Peroxide 5%', type: 'Antibacterial', recommended: false },
    { id: 3, name: 'Clindamycin 1%', type: 'Antibiotic', recommended: false },
    { id: 4, name: 'Adapalene 0.1%', type: 'Topical Retinoid', recommended: true }
  ];

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addPrescriptionItem = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      { id: Date.now(), name: '', dosage: '', frequency: '', duration: '', instructions: '' }
    ]);
  };

  const removePrescriptionItem = (id) => {
    setPrescriptionItems(prescriptionItems.filter(item => item.id !== id));
  };

  const updatePrescriptionItem = (id, field, value) => {
    setPrescriptionItems(prescriptionItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Prescription</DialogTitle>
          <DialogDescription>
            Add medication and dosage information for {patient?.patientName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <div className="flex items-center justify-between mb-3">
            <Label htmlFor="med-search">Search Medications</Label>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>Clear</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              id="med-search"
              placeholder="Search medications..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 max-h-40 overflow-y-auto">
            {filteredMedications.map(med => (
              <div 
                key={med.id}
                className="p-2 border rounded-md cursor-pointer hover:bg-slate-50 flex items-center justify-between"
                onClick={() => {
                  // Update the first prescription item or the first empty one
                  const itemToUpdate = prescriptionItems.find(item => !item.name) || prescriptionItems[0];
                  updatePrescriptionItem(itemToUpdate.id, "name", med.name);
                  setSearchQuery("");
                }}
              >
                <div>
                  <p className="font-medium text-sm">{med.name}</p>
                  <p className="text-xs text-slate-500">{med.type}</p>
                </div>
                {med.recommended && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Recommended</Badge>
                )}
              </div>
            ))}
            {filteredMedications.length === 0 && (
              <div className="col-span-2 p-3 text-center text-slate-500 text-sm">
                No medications found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          {prescriptionItems.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Medication #{index + 1}</h4>
                {prescriptionItems.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-600"
                    onClick={() => removePrescriptionItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`med-name-${item.id}`}>Medication Name</Label>
                  <Input 
                    id={`med-name-${item.id}`}
                    placeholder="Enter medication name" 
                    value={item.name}
                    onChange={e => updatePrescriptionItem(item.id, "name", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`med-dosage-${item.id}`}>Dosage</Label>
                    <Input 
                      id={`med-dosage-${item.id}`}
                      placeholder="e.g., 10mg" 
                      value={item.dosage}
                      onChange={e => updatePrescriptionItem(item.id, "dosage", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`med-frequency-${item.id}`}>Frequency</Label>
                    <Select 
                      value={item.frequency} 
                      onValueChange={value => updatePrescriptionItem(item.id, "frequency", value)}
                    >
                      <SelectTrigger id={`med-frequency-${item.id}`}>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once-daily">Once daily</SelectItem>
                        <SelectItem value="twice-daily">Twice daily</SelectItem>
                        <SelectItem value="three-times-daily">Three times daily</SelectItem>
                        <SelectItem value="every-morning">Every morning</SelectItem>
                        <SelectItem value="every-night">Every night</SelectItem>
                        <SelectItem value="as-needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`med-duration-${item.id}`}>Duration</Label>
                  <Select 
                    value={item.duration} 
                    onValueChange={value => updatePrescriptionItem(item.id, "duration", value)}
                  >
                    <SelectTrigger id={`med-duration-${item.id}`}>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-days">3 days</SelectItem>
                      <SelectItem value="5-days">5 days</SelectItem>
                      <SelectItem value="7-days">7 days</SelectItem>
                      <SelectItem value="10-days">10 days</SelectItem>
                      <SelectItem value="14-days">14 days</SelectItem>
                      <SelectItem value="30-days">30 days</SelectItem>
                      <SelectItem value="90-days">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor={`med-instructions-${item.id}`}>Special Instructions</Label>
                  <Textarea 
                    id={`med-instructions-${item.id}`}
                    placeholder="Any special instructions for this medication" 
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={addPrescriptionItem}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Another Medication
          </Button>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="ml-2">
            <FileText className="mr-2 h-4 w-4" /> Create Prescription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialog;