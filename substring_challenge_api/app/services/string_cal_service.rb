class StringCalService
  attr_accessor :str_a

  class << self
    def call(str)
      new(str)
    end
  end

  def initialize(str)
    self.str_a = str
  end

  def non_continous_substr?(str_b)
    chars = str_b.split('')
    str_a.each_char { |c| chars.shift if chars.first.eql? c }
    chars.empty?
  end
end
