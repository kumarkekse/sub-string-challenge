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
    matched_letters = '<div>'
    chars = str_b.split('')
    str_a.each_char do |c|
      if chars.first.eql? c
        chars.shift
        matched_letters.concat("<u>#{c}</u>")
      else
        matched_letters.concat(c)
      end
    end
    matched_letters.concat('</div>')
    {
      result: chars.empty?,
      matched_letters: matched_letters
    }
  end
end
