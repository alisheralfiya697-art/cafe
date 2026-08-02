import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, Check, Award, ArrowRight, CreditCard, Smartphone, Store } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    userProfile,
    showToast,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false);

  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('T-01');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'counter'>('upi');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (activeCoupon) {
    if (activeCoupon.flatDiscount) {
      discount += activeCoupon.flatDiscount;
    } else if (activeCoupon.discountPercent) {
      discount += Math.round((subtotal * activeCoupon.discountPercent) / 100);
    }
  }

  const maxLoyaltyDiscount = userProfile ? Math.min(Math.floor(userProfile.loyaltyPoints / 10), subtotal) : 0;
  const loyaltyDiscount = useLoyaltyPoints ? maxLoyaltyDiscount : 0;

  const total = Math.max(0, subtotal + tax - discount - loyaltyDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleFinalOrder = () => {
    setIsCheckoutModalOpen(false);
    setOrderSuccessModalOpen(true);
    showToast('Order Placed Successfully! Sent to Café Kitchen ☕');
    clearCart();
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-[#faf7f2] dark:bg-[#16120e] border-l border-[#e8dfd1] dark:border-[#2d261e] shadow-2xl flex flex-col">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#e8dfd1] dark:border-[#2d261e] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-serif text-lg font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                  Your Order Cart
                </h3>
                <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#e8dfd1] dark:hover:bg-[#2d261e] text-[#6b5c4f] dark:text-[#a39587]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 text-[#d4af37] mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#1c130d] dark:text-[#f8f4ed]">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-[#6b5c4f] dark:text-[#a39587]">
                    Explore our artisanal coffee and gourmet desserts to start ordering.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#1f1a14] border border-[#e8dfd1] dark:border-[#2d261e] flex gap-3 shadow-sm"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-serif text-sm font-semibold text-[#1c130d] dark:text-[#f8f4ed] truncate">
                          {item.menuItem.name}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8c7b6c] hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Options Tags */}
                      <div className="text-[11px] text-[#8c7b6c] dark:text-[#a39587] space-y-0.5 mt-0.5">
                        {item.selectedMilk && <div>Milk: {item.selectedMilk}</div>}
                        {item.selectedSweetness && <div>Sweetness: {item.selectedSweetness}</div>}
                        {item.selectedAdditions && item.selectedAdditions.length > 0 && (
                          <div>
                            Additions: {item.selectedAdditions.map((a) => a.name).join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-sm text-[#d4af37]">
                          ₹{item.itemTotal}
                        </span>

                        <div className="flex items-center gap-2 bg-[#faf7f2] dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="text-[#6b5c4f] dark:text-[#a39587] hover:text-[#d4af37]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="text-[#6b5c4f] dark:text-[#a39587] hover:text-[#d4af37]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Coupon Section */}
              {cart.length > 0 && (
                <div className="pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1c130d] dark:text-[#f8f4ed]">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#d4af37]" /> Apply Coupon Code
                    </span>
                  </div>

                  {activeCoupon ? (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-500">{activeCoupon.code}</span>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                          {activeCoupon.description}
                        </p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-400 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. WELCOME50, GOLD200"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a1612] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed] uppercase placeholder:normal-case placeholder:text-[#8c7b6c]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#120e0b] text-xs font-bold hover:brightness-110"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

                  {/* Loyalty Points Redemption Toggle */}
                  {userProfile && userProfile.loyaltyPoints > 0 && (
                    <div className="p-2.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#d4af37]" />
                        <div>
                          <p className="font-semibold text-[#1c130d] dark:text-[#f8f4ed]">
                            Redeem VIP Gold Beans ({userProfile.loyaltyPoints} Pts)
                          </p>
                          <p className="text-[10px] text-[#8c7b6c] dark:text-[#a39587]">
                            Save up to ₹{maxLoyaltyDiscount}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={useLoyaltyPoints}
                        onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
                        className="w-4 h-4 accent-[#d4af37] cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Total & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#e8dfd1] dark:border-[#2d261e] bg-white dark:bg-[#120e0b] space-y-3">
                <div className="space-y-1 text-xs text-[#6b5c4f] dark:text-[#a39587]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST & Service Charge (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-500 font-medium">
                      <span>Coupon Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  {loyaltyDiscount > 0 && (
                    <div className="flex justify-between text-amber-500 font-medium">
                      <span>Loyalty Beans Discount</span>
                      <span>-₹{loyaltyDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-base font-bold text-[#1c130d] dark:text-[#f8f4ed] pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e]">
                    <span>Total Amount</span>
                    <span className="gold-gradient-text text-lg">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full py-3 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-sm shadow-lg hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#faf7f2] dark:bg-[#1a1612] border border-[#d4af37]/40 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#e8dfd1] dark:border-[#2d261e] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
                Complete Your Order
              </h3>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-[#6b5c4f] hover:text-[#d4af37]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-2">
                Select Order Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 ${
                    orderType === 'dine-in'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                      : 'border-[#e8dfd1] dark:border-[#2d261e] text-[#6b5c4f]'
                  }`}
                >
                  <Store className="w-4 h-4" /> Dine-In at Table
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 ${
                    orderType === 'takeaway'
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                      : 'border-[#e8dfd1] dark:border-[#2d261e] text-[#6b5c4f]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" /> Express Takeaway
                </button>
              </div>
            </div>

            {orderType === 'dine-in' && (
              <div>
                <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-1">
                  Table Number
                </label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#120e0b] border border-[#e8dfd1] dark:border-[#2d261e] text-xs text-[#1c130d] dark:text-[#f8f4ed]"
                >
                  <option value="T-01">Table T-01 (Indoor Lounge)</option>
                  <option value="T-02">Table T-02 (Window View)</option>
                  <option value="T-03">Table T-03 (Fireplace Sofa)</option>
                  <option value="G-01">Table G-01 (Garden Fountain)</option>
                  <option value="ROOF-1">Table ROOF-1 (Rooftop Starlight)</option>
                </select>
              </div>
            )}

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-[#8c7b6c] dark:text-[#a39587] mb-2">
                Select Payment Method (INR)
              </label>
              <div className="space-y-2">
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#d4af37] bg-[#d4af37]/10'
                      : 'border-[#e8dfd1] dark:border-[#2d261e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <span className="text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed] block">
                        Instant UPI / Google Pay / PhonePe
                      </span>
                      <span className="text-[10px] text-[#8c7b6c]">Scan QR or Pay via VPA</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#d4af37]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#d4af37] bg-[#d4af37]/10'
                      : 'border-[#e8dfd1] dark:border-[#2d261e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <span className="text-xs font-bold text-[#1c130d] dark:text-[#f8f4ed] block">
                        Credit / Debit Card (Visa, Mastercard, RuPay)
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#d4af37]"
                  />
                </label>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e8dfd1] dark:border-[#2d261e] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8c7b6c] block">Total Payable</span>
                <span className="font-serif text-xl font-bold gold-gradient-text">₹{total}</span>
              </div>
              <button
                onClick={handleFinalOrder}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-sm shadow-lg hover:brightness-110"
              >
                Pay & Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {orderSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-[#faf7f2] dark:bg-[#1a1612] border border-[#d4af37] rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full gold-gradient-bg text-[#120e0b] mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1c130d] dark:text-[#f8f4ed]">
              Order Received!
            </h3>
            <p className="text-xs text-[#6b5c4f] dark:text-[#a39587] leading-relaxed">
              Your order has been transmitted directly to our Master Baristas. Sit back and enjoy the luxury ambiance.
            </p>
            <div className="p-3 bg-[#d4af37]/10 rounded-xl text-xs font-semibold text-[#d4af37]">
              Order Ref: #ORD-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <button
              onClick={() => {
                setOrderSuccessModalOpen(false);
                setIsCartOpen(false);
              }}
              className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#120e0b] font-bold text-xs"
            >
              Back to Café
            </button>
          </div>
        </div>
      )}
    </>
  );
};
